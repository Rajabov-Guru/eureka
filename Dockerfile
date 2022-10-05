FROM node:16.13-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]

FROM node:16.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]