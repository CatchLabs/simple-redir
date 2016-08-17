FROM node:6.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY src config typings.json tsconfig.json package.json /usr/src/app/
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run typings
RUN npm run build

EXPOSE 80

ENV PORT=80
CMD [ "npm", "start" ]