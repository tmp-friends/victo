# TODO: versionを指定する
FROM node:16-alpine

WORKDIR /app/backend

COPY /backend/package*.json ./

RUN npm i &&\
    npm i -g @nestjs/cli

COPY /backend ./

CMD [ "npm", "run", "start:dev" ]
