FROM node:16.13-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]

FROM node:16.13-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]