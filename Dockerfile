# source
# https://stackoverflow.com/questions/78034829/how-to-perform-drizzle-migrations-in-sqlite-using-docker-on-production-database

FROM node:22-alpine AS base

RUN npm i -g pnpm
RUN apk add --no-cache libc6-compat
RUN corepack enable
RUN corepack prepare pnpm@10.2.0
# set the store dir to a folder that is not in the project
# RUN pnpm config set store-dir ~/.pnpm-store
# RUN pnpm fetch

# Stage 1: Install dependencies
FROM base AS deps
USER node
WORKDIR /app

RUN pnpm init
RUN printf "onlyBuiltDependencies:\n- better-sqlite3\n" >> pnpm-workspace.yaml
RUN pnpm add better-sqlite3
RUN node -e 'new require("better-sqlite3")(":memory:")'

COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm i --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .

COPY --chown=node:node /drizzle ./drizzle

COPY --chown=node:node .env .env

USER root

# Give /data directory correct permissions otherwise WAL mode won't work. It means you can't have 2 users writing to the database at the same time without this line as *.sqlite-wal & *.sqlite-shm are automatically created & deleted when *.sqlite is busy.
RUN mkdir -p /data && chown -R node:node /data

ENV NODE_ENV=production

RUN pnpm build

# Stage 3: Production server
FROM base AS runner
USER node
WORKDIR /app

EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# COPY --from=builder --chown=node:node /app/public ./public

COPY --from=deps --chown=node:node /app/node_modules ./node_modules

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

COPY --from=builder --chown=node:node /app/drizzle ./drizzle

COPY --from=builder --chown=node:node /app/migrate.ts ./migrate.ts
COPY --from=builder --chown=node:node /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=node:node /app/run.sh ./run.sh

RUN chmod +x run.sh

CMD ["sh", "run.sh"]