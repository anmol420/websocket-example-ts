FROM oven/bun:1-slim AS base
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .

FROM base AS release
WORKDIR /app
COPY --from=base /app .
EXPOSE 3000
CMD ["bun", "run", "dev"]