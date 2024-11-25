FROM node:23.1-alpine3.20 AS builder

WORKDIR /app

RUN apk update && \
    apk upgrade && \
    apk add --no-cache openssl

RUN npm set registry https://registry.npmjs.org/ && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm run build

FROM node:23.1-alpine3.20

WORKDIR /app

RUN apk update && \
    apk upgrade && \
    apk add --no-cache openssl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY package*.json ./


ENV PORT=4000
ENV CHOKIDAR_USEPOLLING=true

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]