FROM node:16.11.1-alpine

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ARG BUILD_HASH
ENV BUILD_HASH=$BUILD_HASH

# Install dependencies
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install --immutable

# Bundle app source
COPY . .

RUN yarn build

CMD yarn start
