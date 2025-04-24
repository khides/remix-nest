FROM node:20 AS builder
WORKDIR /app
COPY package*.json .npmrc ./
COPY .env.prod .env
RUN npm install
COPY . .
COPY .env.prod .env
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package*.json .npmrc auth.mock.yaml ./
COPY .env.prod .env
RUN npm install --production
CMD ["npm", "run", "start"]
