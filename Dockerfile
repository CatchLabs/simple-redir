FROM node:6.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --registry=https://registry.npm.taobao.org

COPY . /usr/src/app
RUN npm run build

EXPOSE 80

ENV PORT=80
CMD [ "npm", "start" ]