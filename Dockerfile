FROM node:14-slim

RUN apt-get update -y \
  && apt-get install -y python build-essential sqlite3

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npx tsc

RUN npm run build

USER node

EXPOSE 62000

CMD ["node", "dist/server.js"]