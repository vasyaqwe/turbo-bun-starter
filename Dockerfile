ARG BUN_IMAGE_PROD=docker.io/oven/bun:1.1.13-slim

# Base
FROM ${BUN_IMAGE_PROD} AS base

WORKDIR /app

# Copy app source
COPY ./package.json ./
COPY ./tooling/typescript/package.json ./tooling/typescript/package.json
COPY ./packages/db/package.json ./packages/db/package.json
COPY ./packages/api/package.json ./packages/api/package.json
COPY ./packages/emails/package.json ./packages/emails/package.json
COPY ./apps/server/package.json ./apps/server/package.json

# Install - prod
FROM base AS install-prod

COPY ./tooling ./tooling
COPY ./packages ./packages
COPY ./apps/server ./apps/server
RUN bun install --ignore-scripts --production

# Build
FROM base AS build

ENV NODE_ENV=production
COPY --from=install-prod /app/node_modules ./node_modules
COPY ./tooling ./tooling
COPY ./packages ./packages
COPY ./apps/server ./apps/server
RUN bun run --cwd ./packages/db build && bun run --cwd ./packages/emails build && bun run --cwd ./packages/api build

FROM ${BUN_IMAGE_PROD} AS prod

ENV NODE_ENV=production
WORKDIR /app
COPY --chown=bun:root --from=install-prod /app/package.json /app/package.json
COPY --chown=bun:root --from=install-prod /app/node_modules /app/node_modules
COPY --chown=bun:root --from=build /app/packages/db /app/packages/db
COPY --chown=bun:root --from=build /app/packages/emails /app/packages/emails
COPY --chown=bun:root --from=build /app/packages/api /app/packages/api
COPY --chown=bun:root --from=build /app/apps/server /app/apps/server
USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "--cwd", "/app/apps/server", "start" ]
