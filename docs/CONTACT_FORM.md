# Contact form operations

The Contact page posts to `/api/contact`, a Cloudflare Pages Function. The function validates the request, checks Turnstile, applies a short rate limit, and sends a transactional email through Cloudflare Email Service. It does not write the enquiry to a database.

## Public build configuration

Set `PUBLIC_TURNSTILE_SITEKEY` in the environment that runs `npm run build`. This is a public widget key, not a secret. If it is missing, the online submit button stays disabled and the page displays `contact@healthtag.io` as the fallback.

For GitHub Actions, store the value as a repository or environment variable and expose it only to the build step:

```yaml
env:
  PUBLIC_TURNSTILE_SITEKEY: ${{ vars.PUBLIC_TURNSTILE_SITEKEY }}
```

## Pages bindings and secrets

`wrangler.jsonc` declares these bindings:

- `EMAIL`: Cloudflare Email Service sending binding
- `CONTACT_RATE_LIMITER`: native rate-limiting binding

Set these Pages secrets through the Cloudflare dashboard or Wrangler. Do not commit their values:

- `TURNSTILE_SECRET`
- `TURNSTILE_HOSTNAMES`
- `CONTACT_RECIPIENT_ROUTES`

`TURNSTILE_HOSTNAMES` is a comma-separated allowlist. Production should contain only production hostnames. Do not add `localhost` or `127.0.0.1` to the production value.

`CONTACT_RECIPIENT_ROUTES` is a JSON object with every supported topic:

```json
{
  "provider_integration": "verified-recipient@example.com",
  "government_university": "verified-recipient@example.com",
  "business_partnership": "verified-recipient@example.com",
  "investor_relations": "verified-recipient@example.com",
  "press": "verified-recipient@example.com",
  "other": "verified-recipient@example.com"
}
```

Use only verified Email Service destination addresses. Keep private recipient addresses in the secret value, not in source files.

## Cloudflare account setup

Before production deployment:

1. Onboard `healthtag.io` in Cloudflare Email Service.
2. Confirm the sender `contact@healthtag.io` is allowed by the Email Service binding.
3. Create a managed Turnstile widget for the approved production and local-development domains.
4. Confirm the rate-limit `namespace_id` in `wrangler.jsonc` is unique within the Cloudflare account.
5. Add the public sitekey to the build environment.
6. Add the three Pages secrets.

## Validation

Run:

```bash
npm run check:worker-types
npm run test:contact
npm run validate
```

Production validation must use the real deployed endpoint:

1. Send one enquiry with a fresh Turnstile token.
2. Confirm the endpoint reports success only after Email Service accepts the message.
3. Confirm the configured mailbox receives both text and HTML content.
4. Confirm Reply-To uses the visitor's supplied email address.
5. Replay the same Turnstile token and confirm the endpoint rejects it.
6. Submit more than the configured short-window limit and confirm a rate-limit response.
7. Review Workers logs and confirm they contain the request reference, topic, route, and outcome without the visitor's name, email, organization, or message.

## Privacy boundary

The website does not store enquiries in a database. Email delivery systems and recipient mailboxes may retain a message under their own operational policies. The public Privacy page describes this boundary and tells visitors not to send patient information, medical records, credentials, or other sensitive information.
