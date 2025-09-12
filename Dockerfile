# Etapa de build
FROM node:lts-alpine AS builder

RUN apk add --no-cache openssl bash curl unzip

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN bun run build

FROM node:lts-alpine

RUN apk add --no-cache openssl bash curl unzip

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

COPY package*.json ./

RUN bun install

COPY --from=builder /app/dist ./dist

COPY prisma ./prisma

COPY prisma.config.ts .

RUN bun run generate
