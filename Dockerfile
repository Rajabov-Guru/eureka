FROM node:16.13-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]

FROM node:16.13-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]