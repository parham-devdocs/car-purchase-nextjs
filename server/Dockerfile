FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --verbose

COPY ./dist ./dist

CMD ["node", "dist/index.js"]
