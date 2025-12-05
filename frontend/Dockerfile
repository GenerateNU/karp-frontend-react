FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production --ignore-scripts

FROM base AS prerelease
WORKDIR /usr/src/app
COPY --from=install /temp/dev/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM base AS release
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=install /temp/prod/node_modules ./node_modules

COPY --from=prerelease /usr/src/app/dist ./dist
COPY --from=prerelease /usr/src/app/index.html ./index.html
COPY --from=prerelease /usr/src/app/public ./public
COPY --from=prerelease /usr/src/app/vite.config.* ./   
COPY --from=prerelease /usr/src/app/package.json ./package.json

USER bun
EXPOSE 3000
CMD ["bunx", "--bun", "vite", "preview", "--host", "0.0.0.0", "--port", "3000"]
