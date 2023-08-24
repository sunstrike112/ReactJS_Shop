FROM node:14
WORKDIR /app
COPY package* ./
RUN yarn install
COPY public ./public
COPY src ./src
RUN yarn run build


