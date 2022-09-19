# TODO: versionを指定する
FROM node:16-alpine

WORKDIR /app/frontend

COPY /frontend/package*.json ./

RUN npm i

COPY /frontend ./

CMD [ "npm", "run", "dev" ]
