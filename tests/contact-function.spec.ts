import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import {
  handleContactRequest,
  type ContactDependencies,
  type ContactEnvironment,
} from '../functions/api/contact';

const ROUTES = {
  provider_integration: 'provider@example.test',
  government_university: 'public-sector@example.test',
  business_partnership: 'partnerships@example.test',
  investor_relations: 'investors@example.test',
  press: 'press@example.test',
  other: 'contact@example.test',
};

interface SentEmail {
  to: string;
  from: { email: string; name: string };
  replyTo: { email: string; name: string };
  subject: string;
  text: string;
  html: string;
}

interface Harness {
  env: ContactEnvironment;
  dependencies: ContactDependencies;
  sent: SentEmail[];
  logs: Record<string, unknown>[];
  siteverify: { success: boolean; action?: string; hostname?: string };
  failEmail: () => void;
}

function createHarness(): Harness {
  const sent: SentEmail[] = [];
  const logs: Record<string, unknown>[] = [];
  const siteverify = { success: true, action: 'contact', hostname: 'healthtag.io' };
  let emailShouldFail = false;
  const env = {
    EMAIL: {
      send: async (message: SentEmail) => {
        if (emailShouldFail) throw new Error('simulated email failure');
        sent.push(message);
        return { messageId: 'test-message-id' };
      },
    },
    CONTACT_RATE_LIMITER: {
      limit: async () => ({ success: true }),
    },
    CONTACT_RECIPIENT_ROUTES: JSON.stringify(ROUTES),
    TURNSTILE_HOSTNAMES: 'healthtag.io',
    TURNSTILE_SECRET: 'test-secret-not-for-production',
  } as ContactEnvironment;
  const dependencies: ContactDependencies = {
    fetch: async (input, init) => {
      expect(String(input)).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify');
      expect(init?.method).toBe('POST');
      const body = init?.body as URLSearchParams;
      expect(body.get('secret')).toBe('test-secret-not-for-production');
      expect(body.get('response')).toBe('turnstile-test-token');
      return Response.json(siteverify);
    },
    randomUUID: () => '9b7df910-842d-40a4-a734-47c6c4789c6e',
    info: (event) => { logs.push(event); },
    error: (event) => { logs.push(event); },
  };
  return {
    env,
    dependencies,
    sent,
    logs,
    siteverify,
    failEmail: () => { emailShouldFail = true; },
  };
}

function contactRequest(
  fields: Partial<Record<'name' | 'email' | 'organization' | 'topic' | 'message' | 'cf-turnstile-response', string>> = {},
  headers: Record<string, string> = {},
): Request {
  const body = new URLSearchParams({
    name: 'Test Visitor',
    email: 'visitor@example.com',
    organization: 'Example Hospital',
    topic: 'investor_relations',
    message: 'Sensitive fixture phrase used only to verify that logs omit message text.',
    'cf-turnstile-response': 'turnstile-test-token',
    ...fields,
  });
  return new Request('https://healthtag.io/api/contact', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Origin: 'https://healthtag.io',
      Referer: 'https://healthtag.io/en/contact/',
      'CF-Connecting-IP': '203.0.113.12',
      ...headers,
    },
    body,
  });
}

test('routes a verified enquiry and sends text and HTML with Reply-To', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(contactRequest(), harness.env, harness.dependencies);

  expect(response.status).toBe(200);
  await expect(response.json()).resolves.toMatchObject({
    ok: true,
    requestId: '9b7df910-842d-40a4-a734-47c6c4789c6e',
  });
  expect(harness.sent).toHaveLength(1);
  expect(harness.sent[0]).toMatchObject({
    to: ROUTES.investor_relations,
    from: { email: 'contact@healthtag.io', name: 'HealthTAG Website' },
    replyTo: { email: 'visitor@example.com', name: 'Test Visitor' },
  });
  expect(harness.sent[0].text).toContain('Sensitive fixture phrase');
  expect(harness.sent[0].html).toContain('Sensitive fixture phrase');
  expect(JSON.stringify(harness.logs)).not.toContain('Sensitive fixture phrase');
  expect(JSON.stringify(harness.logs)).not.toContain('visitor@example.com');
});

test('rejects cross-origin and oversized requests before verification or email', async () => {
  const crossOriginHarness = createHarness();
  const crossOrigin = contactRequest({}, { Origin: 'https://attacker.example' });
  const crossOriginResponse = await handleContactRequest(
    crossOrigin,
    crossOriginHarness.env,
    crossOriginHarness.dependencies,
  );
  expect(crossOriginResponse.status).toBe(403);
  await expect(crossOriginResponse.json()).resolves.toMatchObject({
    ok: false,
    error: { code: 'origin_mismatch' },
  });
  expect(crossOriginHarness.sent).toHaveLength(0);

  const oversizedHarness = createHarness();
  const oversized = contactRequest({}, { 'Content-Length': String(25 * 1024) });
  const oversizedResponse = await handleContactRequest(
    oversized,
    oversizedHarness.env,
    oversizedHarness.dependencies,
  );
  expect(oversizedResponse.status).toBe(413);
  expect(oversizedHarness.sent).toHaveLength(0);
});

test('fails closed when Turnstile action or hostname does not match', async () => {
  const harness = createHarness();
  harness.siteverify.action = 'signup';
  harness.siteverify.hostname = 'preview.example';

  const response = await handleContactRequest(contactRequest(), harness.env, harness.dependencies);
  expect(response.status).toBe(403);
  await expect(response.json()).resolves.toMatchObject({
    ok: false,
    error: { code: 'verification_failed' },
  });
  expect(harness.sent).toHaveLength(0);
});

test('returns structured field errors and keeps recipient routing in environment data', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    contactRequest({ email: 'not-an-email', message: 'short' }),
    harness.env,
    harness.dependencies,
  );

  expect(response.status).toBe(400);
  await expect(response.json()).resolves.toMatchObject({
    ok: false,
    error: {
      code: 'validation_failed',
      fields: { email: 'invalid', message: 'invalid' },
    },
  });
  expect(harness.sent).toHaveLength(0);
  expect(JSON.stringify(ROUTES)).not.toContain('healthtag.io');
});

test('native form success redirects only after the email binding accepts the message', async () => {
  const harness = createHarness();
  const request = contactRequest({}, { Accept: 'text/html' });
  const response = await handleContactRequest(request, harness.env, harness.dependencies);

  expect(response.status).toBe(303);
  expect(response.headers.get('Location')).toBe('/en/contact/?contact=sent');
  expect(harness.sent).toHaveLength(1);
});

test('does not claim success when the email binding rejects the message', async () => {
  const harness = createHarness();
  harness.failEmail();
  const response = await handleContactRequest(contactRequest(), harness.env, harness.dependencies);

  expect(response.status).toBe(503);
  await expect(response.json()).resolves.toMatchObject({
    ok: false,
    error: { code: 'delivery_failed' },
  });
  expect(harness.sent).toHaveLength(0);
});

test('keeps the public sitekey and runtime secrets as explicit configuration contracts', async () => {
  const [envExample, contactSource, wranglerSource] = await Promise.all([
    readFile('.env.example', 'utf8'),
    readFile('src/components/ContactPage.astro', 'utf8'),
    readFile('wrangler.jsonc', 'utf8'),
  ]);
  const wranglerConfig = JSON.parse(wranglerSource) as {
    secrets?: { required?: string[] };
    vars?: Record<string, string>;
  };

  expect(envExample).toContain('PUBLIC_TURNSTILE_SITEKEY=TURNSTILE_SITEKEY_REQUIRED');
  expect(envExample).not.toMatch(/TURNSTILE_SECRET\s*=/);
  expect(contactSource).toContain('import.meta.env.PUBLIC_TURNSTILE_SITEKEY');
  expect(wranglerConfig.vars).toBeUndefined();
  expect(wranglerConfig.secrets?.required).toEqual(expect.arrayContaining([
    'CONTACT_RECIPIENT_ROUTES',
    'TURNSTILE_HOSTNAMES',
    'TURNSTILE_SECRET',
  ]));
});
