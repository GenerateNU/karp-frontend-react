FROM oven/bun:1 AS base
WORKDIR /usr/src/app

COPY . .
RUN bun install

EXPOSE 3000
CMD ["bun", "run", "preview"]
