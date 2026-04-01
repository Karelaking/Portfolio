# Portfolio (Next.js 16)

## Environment setup

This project now uses dedicated env files per runtime environment:

- `.env` → shared non-secret defaults
- `.env.development` → development defaults
- `.env.test` → test defaults
- `.env.production` → production defaults (non-secret placeholders)
- `.env.local` / `.env.development.local` / `.env.test.local` / `.env.production.local` → machine-local secrets (gitignored)

### First-time setup

1. Copy `.env.example` to `.env.local`.
2. Fill in real secret values in `.env.local` (or environment-specific `*.local` files).
3. Keep committed env files free of secrets.

### Recommended usage

- Local dev: keep secrets in `.env.development.local`
- Automated tests: use `.env.test` defaults, override in CI as needed
- Production: set secrets in your deployment provider or `.env.production.local`

### Variables used by this app

- `NEXT_PUBLIC_SITE_URL`
- Clerk auth keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, auth URL vars)
- ImageKit keys (`NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`)
- MongoDB (`MONGODB_URI`, `MONGODB_DB_NAME`)
- Email delivery (`RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`)
- Optional integrations (`LINGODOTDEV_API_KEY`, `GITHUB_TOKEN`)
