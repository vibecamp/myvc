FROM node:24-slim

LABEL org.opencontainers.image.source=https://github.com/vibecamp/myvc

ENV TZ=UTC COREPACK_ENABLE_DOWNLOAD_PROMPT=0 NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && mkdir /app && chown node:node /app

USER node
WORKDIR /app

COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .
RUN DATABASE_URL=postgresql://build:build@localhost:5432/build \
    JWT_SECRET=build \
    STRIPE_SECRET_KEY=sk_test_build \
    STRIPE_WEBHOOK_SECRET=whsec_build \
    APP_BASE_URL=https://my.vibe.camp \
    AV_NEEDS_EMAIL=build@example.com \
    pnpm build && rm -rf .next/cache

ENV NODE_ENV=production
EXPOSE 3000
CMD ["./node_modules/.bin/next", "start"]
