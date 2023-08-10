FROM node:14.19-alpine3.15


WORKDIR /usr/src/app
COPY package*.json ./

COPY ecosystem.config.js ./

RUN npm install -g npm@9.8.1
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN npm install
RUN npm install -g pm2

COPY . .

RUN npm run build


CMD sh deploy.sh


# CMD ["pm2-runtime", "start", "ecosystem.config.js"]