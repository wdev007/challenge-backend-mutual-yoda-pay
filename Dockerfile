# FROM node:12-alpine3.10

# # RUN npm install -g yarn

# WORKDIR /app

# COPY ./package.json /app/

# RUN npm i -g @nestjs/cli

# RUN npm i

# # RUN npm run typeorm migration:run

# COPY . /app/

# EXPOSE ${APP_PORT}

# CMD ["yarn", "start:dev"]

FROM node:latest AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]