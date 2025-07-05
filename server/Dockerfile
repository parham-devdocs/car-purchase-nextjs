# Stage 1: Build
FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install --include=dev

COPY . .
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY --from=builder /usr/src/app/dist ./dist

# Copy any runtime config or assets if needed
COPY ./src ./src
Copy ./dist ./dist
CMD ["node", "dist/index.js"]