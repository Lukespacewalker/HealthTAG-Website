const MAX_REQUEST_BYTES = 24 * 1024;
const TURNSTILE_TOKEN_MAX_LENGTH = 2048;
const TURNSTILE_ACTION = 'contact';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const SENDER_ADDRESS = 'contact@healthtag.io';

const CONTACT_TOPICS = [
  'provider_integration',
  'government_university',
  'business_partnership',
  'investor_relations',
  'press',
  'other',
] as const;

type ContactTopic = (typeof CONTACT_TOPICS)[number];

const TOPIC_LABELS: Record<ContactTopic, string> = {
  provider_integration: 'Provider integration',
  government_university: 'Government and university',
  business_partnership: 'Business partnership',
  investor_relations: 'Investor Relations',
  press: 'Press',
  other: 'Other',
};

interface ContactInput {
  name: string;
  email: string;
  organization: string;
  topic: ContactTopic;
  message: string;
  turnstileToken: string;
}

export interface ContactDependencies {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  randomUUID: () => string;
  info: (event: Record<string, unknown>) => void;
  error: (event: Record<string, unknown>) => void;
}

export type ContactEnvironment = Env;

interface ApiErrorBody {
  ok: false;
  error: {
    code: string;
    fields?: Record<string, string>;
  };
  requestId: string;
}

type ValidationResult =
  | { ok: true; input: ContactInput }
  | { ok: false; fields: Record<string, string> };

const DEFAULT_DEPENDENCIES: ContactDependencies = {
  fetch: (input, init) => fetch(input, init),
  randomUUID: () => crypto.randomUUID(),
  info: (event) => console.log(JSON.stringify(event)),
  error: (event) => console.error(JSON.stringify(event)),
};

function apiHeaders(): HeadersInit {
  return {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
  };
}

function jsonError(
  status: number,
  code: string,
  requestId: string,
  fields?: Record<string, string>,
): Response {
  const body: ApiErrorBody = {
    ok: false,
    error: fields ? { code, fields } : { code },
    requestId,
  };
  return Response.json(body, { status, headers: apiHeaders() });
}

function acceptsJson(request: Request): boolean {
  return request.headers.get('Accept')?.includes('application/json') ?? false;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function contactPathFor(request: Request): '/contact/' | '/en/contact/' {
  const referer = request.headers.get('Referer');
  if (!referer) return '/contact/';

  try {
    const refererUrl = new URL(referer);
    if (refererUrl.origin !== new URL(request.url).origin) return '/contact/';
    return refererUrl.pathname.startsWith('/en/contact') ? '/en/contact/' : '/contact/';
  } catch {
    return '/contact/';
  }
}

function htmlError(status: number, requestId: string, request: Request): Response {
  const contactPath = contactPathFor(request);
  const en = contactPath.startsWith('/en/');
  const title = en ? 'Message not sent' : 'ยังไม่ได้ส่งข้อความ';
  const explanation = en
    ? "HealthTAG could not accept this request. Use your browser's Back button to keep editing, or email contact@healthtag.io."
    : 'HealthTAG ยังรับคำขอนี้ไม่ได้ กดปุ่มย้อนกลับของเบราว์เซอร์เพื่อแก้ไขต่อ หรือส่งอีเมลไปที่ contact@healthtag.io';
  const backLabel = en ? 'Return to Contact' : 'กลับหน้าติดต่อ';
  const html = `<!doctype html>
<html lang="${en ? 'en' : 'th'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>${escapeHtml(title)} | HealthTAG</title>
</head>
<body>
  <main>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(explanation)}</p>
    <p><a href="mailto:contact@healthtag.io">contact@healthtag.io</a></p>
    <p><a href="${contactPath}">${escapeHtml(backLabel)}</a></p>
    <small>Reference: ${escapeHtml(requestId)}</small>
  </main>
</body>
</html>`;

  return new Response(html, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'",
      'Content-Type': 'text/html; charset=utf-8',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function errorResponse(
  request: Request,
  status: number,
  code: string,
  requestId: string,
  fields?: Record<string, string>,
): Response {
  return acceptsJson(request)
    ? jsonError(status, code, requestId, fields)
    : htmlError(status, requestId, request);
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

async function readBoundedBody(request: Request): Promise<string | null> {
  const contentLength = request.headers.get('Content-Length');
  if (contentLength) {
    const declaredLength = Number.parseInt(contentLength, 10);
    if (!Number.isFinite(declaredLength) || declaredLength < 0 || declaredLength > MAX_REQUEST_BYTES) {
      return null;
    }
  }

  if (!request.body) return '';

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let body = '';

  while (true) {
    const result = await reader.read();
    if (result.done) break;
    received += result.value.byteLength;
    if (received > MAX_REQUEST_BYTES) {
      await reader.cancel('request body too large');
      return null;
    }
    body += decoder.decode(result.value, { stream: true });
  }

  return body + decoder.decode();
}

function cleanSingleLine(value: string): string {
  return value
    .normalize('NFC')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanMessage(value: string): string {
  return value
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();
}

function isEmail(value: string): boolean {
  return value.length <= 254
    && !/[\r\n]/.test(value)
    && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(value);
}

function isContactTopic(value: string): value is ContactTopic {
  return (CONTACT_TOPICS as readonly string[]).includes(value);
}

function parseFormBody(body: string): ValidationResult {
  const params = new URLSearchParams(body);
  const allowedKeys = new Set([
    'name',
    'email',
    'organization',
    'topic',
    'message',
    'cf-turnstile-response',
  ]);
  const fields: Record<string, string> = {};

  for (const key of params.keys()) {
    if (!allowedKeys.has(key) || params.getAll(key).length !== 1) fields.form = 'invalid';
  }

  const name = cleanSingleLine(params.get('name') ?? '');
  const email = cleanSingleLine(params.get('email') ?? '');
  const organization = cleanSingleLine(params.get('organization') ?? '');
  const topic = cleanSingleLine(params.get('topic') ?? '');
  const message = cleanMessage(params.get('message') ?? '');
  const turnstileToken = cleanSingleLine(params.get('cf-turnstile-response') ?? '');

  if (name.length < 1 || name.length > 100) fields.name = 'invalid';
  if (!isEmail(email)) fields.email = 'invalid';
  if (organization.length > 150) fields.organization = 'invalid';
  if (!isContactTopic(topic)) fields.topic = 'invalid';
  if (message.length < 10 || message.length > 4_000) fields.message = 'invalid';
  if (turnstileToken.length < 1 || turnstileToken.length > TURNSTILE_TOKEN_MAX_LENGTH) {
    fields.turnstile = 'required';
  }

  if (Object.keys(fields).length > 0 || !isContactTopic(topic)) return { ok: false, fields };

  return {
    ok: true,
    input: { name, email, organization, topic, message, turnstileToken },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseRecipientRoutes(raw: string): Record<ContactTopic, string> | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(parsed)) return null;

  const routes = {} as Record<ContactTopic, string>;
  for (const topic of CONTACT_TOPICS) {
    const recipient = parsed[topic];
    if (typeof recipient !== 'string' || !isEmail(recipient)) return null;
    routes[topic] = recipient;
  }
  return routes;
}

interface TurnstileResponse {
  success: boolean;
  action?: string;
  hostname?: string;
}

function parseTurnstileResponse(value: unknown): TurnstileResponse | null {
  if (!isRecord(value) || typeof value.success !== 'boolean') return null;
  if (value.action !== undefined && typeof value.action !== 'string') return null;
  if (value.hostname !== undefined && typeof value.hostname !== 'string') return null;
  return { success: value.success, action: value.action, hostname: value.hostname };
}

async function verifyTurnstile(
  request: Request,
  input: ContactInput,
  env: Env,
  dependencies: ContactDependencies,
): Promise<'valid' | 'invalid' | 'unavailable'> {
  if (typeof env.TURNSTILE_HOSTNAMES !== 'string' || typeof env.TURNSTILE_SECRET !== 'string') {
    return 'unavailable';
  }
  const expectedHostnames = new Set(
    env.TURNSTILE_HOSTNAMES
      .split(',')
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean),
  );
  if (!env.TURNSTILE_SECRET.trim() || expectedHostnames.size === 0) return 'unavailable';

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET,
    response: input.turnstileToken,
  });
  const remoteIp = request.headers.get('CF-Connecting-IP');
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const response = await dependencies.fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return 'unavailable';

    const result = parseTurnstileResponse(await response.json());
    if (!result) return 'unavailable';
    if (
      result.success !== true
      || result.action !== TURNSTILE_ACTION
      || typeof result.hostname !== 'string'
      || !expectedHostnames.has(result.hostname.toLowerCase())
    ) {
      return 'invalid';
    }
    return 'valid';
  } catch {
    return 'unavailable';
  }
}

function emailText(input: ContactInput, requestId: string): string {
  return [
    'HealthTAG website enquiry',
    `Request ID: ${requestId}`,
    `Topic: ${TOPIC_LABELS[input.topic]}`,
    `Name: ${input.name}`,
    `Reply email: ${input.email}`,
    `Organization: ${input.organization || 'Not provided'}`,
    '',
    'Message:',
    input.message,
    '',
    'The website warns visitors not to submit patient information, medical records, health data, passwords, API keys, credentials, or other sensitive information.',
  ].join('\n');
}

function emailHtml(input: ContactInput, requestId: string): string {
  const organization = input.organization || 'Not provided';
  return `<!doctype html>
<html lang="en">
<body>
  <h1>HealthTAG website enquiry</h1>
  <dl>
    <dt>Request ID</dt><dd>${escapeHtml(requestId)}</dd>
    <dt>Topic</dt><dd>${escapeHtml(TOPIC_LABELS[input.topic])}</dd>
    <dt>Name</dt><dd>${escapeHtml(input.name)}</dd>
    <dt>Reply email</dt><dd>${escapeHtml(input.email)}</dd>
    <dt>Organization</dt><dd>${escapeHtml(organization)}</dd>
  </dl>
  <h2>Message</h2>
  <p>${escapeHtml(input.message).replaceAll('\n', '<br>')}</p>
  <hr>
  <p><small>The website warns visitors not to submit patient information, medical records, health data, passwords, API keys, credentials, or other sensitive information.</small></p>
</body>
</html>`;
}

function successResponse(request: Request, requestId: string): Response {
  if (!acceptsJson(request)) {
    const contactPath = contactPathFor(request);
    return new Response(null, {
      status: 303,
      headers: {
        'Cache-Control': 'no-store',
        Location: `${contactPath}?contact=sent`,
        'Referrer-Policy': 'no-referrer',
      },
    });
  }

  return Response.json(
    {
      ok: true,
      requestId,
      response: 'The team will reply to the supplied email address within seven days.',
    },
    { status: 200, headers: apiHeaders() },
  );
}

export async function handleContactRequest(
  request: Request,
  env: Env,
  dependencies: ContactDependencies = DEFAULT_DEPENDENCIES,
): Promise<Response> {
  const requestId = dependencies.randomUUID();
  const path = new URL(request.url).pathname;

  if (request.method !== 'POST') {
    const response = errorResponse(request, 405, 'method_not_allowed', requestId);
    response.headers.set('Allow', 'POST');
    return response;
  }
  if (!request.headers.has('Origin')) {
    return errorResponse(request, 403, 'origin_required', requestId);
  }
  if (!sameOrigin(request)) {
    return errorResponse(request, 403, 'origin_mismatch', requestId);
  }

  const contentType = request.headers.get('Content-Type')?.split(';', 1)[0]?.trim().toLowerCase();
  if (contentType !== 'application/x-www-form-urlencoded') {
    return errorResponse(request, 415, 'unsupported_media_type', requestId);
  }

  let body: string | null;
  try {
    body = await readBoundedBody(request);
  } catch {
    return errorResponse(request, 400, 'invalid_body', requestId);
  }
  if (body === null) return errorResponse(request, 413, 'payload_too_large', requestId);
  const validation = parseFormBody(body);
  if (!validation.ok) {
    return errorResponse(request, 400, 'validation_failed', requestId, validation.fields);
  }

  const remoteIp = request.headers.get('CF-Connecting-IP');
  if (remoteIp) {
    let rateLimit: RateLimitOutcome;
    try {
      rateLimit = await env.CONTACT_RATE_LIMITER.limit({ key: remoteIp });
    } catch {
      dependencies.error({ event: 'contact_rate_limit_unavailable', requestId, path });
      return errorResponse(request, 503, 'service_unavailable', requestId);
    }
    if (!rateLimit.success) {
      dependencies.info({ event: 'contact_rate_limited', requestId, path });
      return errorResponse(request, 429, 'rate_limited', requestId);
    }
  }

  const verification = await verifyTurnstile(request, validation.input, env, dependencies);
  if (verification === 'unavailable') {
    dependencies.error({ event: 'contact_verification_unavailable', requestId, path });
    return errorResponse(request, 503, 'verification_unavailable', requestId);
  }
  if (verification === 'invalid') {
    return errorResponse(request, 403, 'verification_failed', requestId);
  }

  const recipientRoutes = parseRecipientRoutes(env.CONTACT_RECIPIENT_ROUTES);
  if (!recipientRoutes) {
    dependencies.error({ event: 'contact_configuration_invalid', requestId, path });
    return errorResponse(request, 503, 'service_unavailable', requestId);
  }

  try {
    await env.EMAIL.send({
      to: recipientRoutes[validation.input.topic],
      from: { email: SENDER_ADDRESS, name: 'HealthTAG Website' },
      replyTo: { email: validation.input.email, name: validation.input.name },
      subject: `HealthTAG website enquiry · ${TOPIC_LABELS[validation.input.topic]} · ${requestId}`,
      text: emailText(validation.input, requestId),
      html: emailHtml(validation.input, requestId),
    });
  } catch {
    dependencies.error({ event: 'contact_email_failed', requestId, path });
    return errorResponse(request, 503, 'delivery_failed', requestId);
  }

  dependencies.info({
    event: 'contact_email_accepted',
    requestId,
    path,
    topic: validation.input.topic,
  });
  return successResponse(request, requestId);
}

export const onRequest: PagesFunction<Env> = async (context) => {
  return handleContactRequest(context.request, context.env);
};
