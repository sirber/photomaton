FROM oven/bun:1 AS dev
WORKDIR /app

FROM oven/bun:1 AS prod
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
CMD ["bun", "run", "start"]