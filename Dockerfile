FROM node:latest

WORKDIR /app

COPY ./package.json ./package-lock.json /app/

RUN npm install --no-cache

COPY . /app/

EXPOSE ${APP_PORT}

CMD ["npm", "run", "start:dev"]