FROM node:6.4

RUN mkdir -p /usr/src/app/src /usr/src/app/config
WORKDIR /usr/src/app

COPY typings.json tsconfig.json package.json /usr/src/app/
COPY src /usr/src/app/src
COPY config /usr/src/app/config

RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run typings
RUN npm run build

EXPOSE 80

ENV PORT=80
CMD [ "npm", "start" ]