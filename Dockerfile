FROM node:12-alpine3.10

# RUN npm install -g yarn

WORKDIR /app

COPY ./package.json /app/

RUN ["yarn", "install"]

COPY . /app/

EXPOSE ${APP_PORT}

CMD ["yarn", "start:debug"]