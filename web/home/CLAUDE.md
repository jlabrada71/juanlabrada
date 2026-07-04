# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev          # Start dev server at http://localhost:3000
pnpm build        # Build for production (outputs to .output/)
pnpm generate     # Generate static site
pnpm preview      # Preview production build

# Testing
pnpm test         # Run all Jest tests (uses --experimental-vm-modules)
npx jest tests/color-tools.spec.js  # Run a single test file
```

## Build & Deploy

`web_build.sh <version-tag> '<tag-message>'` — creates a git tag, updates `version.txt` and `components/ProductVersion.vue`, runs `npm run build`, and packages `.output/` as a `.tar` archive.

`web_deploy.sh <project> <server>` — copies the tar to the remote AWS EC2 server.

The production remote is configured as a bare git repo: `git push production main`.

## Architecture

**Nuxt 4 full-stack app** — serves `juanlabrada.com` (personal portfolio + tools).

- **`pages/`** — file-based routing. `/admin/**` routes render as SPA (no SSR). `/api/v1/**` has CORS enabled and `crossOriginResourcePolicy: cross-origin`.
- **`server/api/v1/`** — Nitro server API endpoints (analytics, messages, notifications, test). Connect to MongoDB via `MONGO_URL`/`MONGO_DB` runtime config.
- **`server/routes/`** — additional server routes (sitemap, etc.).
- **`server/middleware/`** — Nitro middleware.
- **`components/experiments/`** — UI animation/visual experiments (GSAP, canvas, SVG). Auto-imported.
- **`components/validation/`** — vee-validate + yup form validation examples. Auto-imported.
- **`components/content/`** — Nuxt Content prose overrides (ProseH1, ProsePre, etc.) and Mermaid diagram integration.
- **`lib/`** — pure JS utilities (color-tools, bezier, word-utils, url-utils, etc.). Import via `@/lib/...` alias.
- **`processes/`** — standalone Node.js scripts for maintenance tasks (delete old analytics/messages).
- **`tests/`** — Jest unit tests for `lib/` utilities.
- **`plugins/`** — Nuxt plugins.

## Runtime Config & Environment

Config priority: shell env vars > `.env` > `nuxt.config.ts`.

Key env vars:
- `MONGO_URL`, `MONGO_DB` — MongoDB connection
- `MAILER_PASS` — nodemailer password (account is `agile@juanlabrada.com`)
- `NUXT_PUBLIC_API_SERVER` — overrides the API base URL (dev default: `http://localhost:3000`, prod: `https://juanlabrada.com`)

Access in code: `const config = useRuntimeConfig()` — `config.public.*` in client/server, `config.*` (non-public) server-only.

## Key Libraries

- **GSAP** — animations in `components/experiments/`
- **chroma-js** — color manipulation (see `lib/color-tools.js`)
- **vee-validate + yup** — form validation
- **@vueuse/core** — Vue composables
- **daisyUI + Tailwind CSS** — UI styling
- **mermaid** — diagram rendering in content components
- **nodemailer + mongodb** — server-side email and data persistence

## Logging

`lib/logger.js` exports `log(message, context)` and `debug(message, context)`. `debug()` is suppressed in production. Both include caller file/line in output via stack trace inspection.
