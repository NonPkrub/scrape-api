FROM node:lts-alpine

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache nmap && \
    echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
    chromium \
    harfbuzz \
    "freetype>2.8" \
    ttf-freefont \
    nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true


# COPY package*.json ./
COPY . .
RUN npm install
RUN npm install chromium
RUN npx prisma generate

EXPOSE 8080

CMD [ "node", "index.js" ]

