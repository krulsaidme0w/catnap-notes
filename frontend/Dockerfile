FROM node:19-alpine

WORKDIR /app

COPY .env .
COPY package*.json .
COPY tsconfig.json .
COPY public ./public
COPY src ./src

RUN npm ci
RUN npm run build
RUN npm install --global serve

EXPOSE 3000

CMD [ "serve", "build" ]
