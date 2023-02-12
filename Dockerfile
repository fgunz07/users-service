FROM node:latest as build

WORKDIR /var/www

COPY . /var/www

RUN npm install
RUN npm run build

FROM node:19-alpine3.16

ENV NODE_CONFIG_DIR=./config

WORKDIR /var/www

COPY --from=build /var/www/build .
COPY --from=build /var/www/package-lock.json .
COPY --from=build /var/www/package.json .

RUN npm install --production

EXPOSE 3000

CMD [ "node", "./bin/www.js" ]
