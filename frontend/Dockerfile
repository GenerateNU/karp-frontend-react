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
COPY --from=install /temp/dev/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM base AS release
WORKDIR /usr/src/app
ENV NODE_ENV=production

# production deps
COPY --from=install /temp/prod/node_modules ./node_modules

# copy built app (and anything else needed at runtime)
COPY --from=prerelease /usr/src/app . 

USER bun
EXPOSE 3000

# use your prod entrypoint, not dev
CMD ["bun", "run", "preview"]
