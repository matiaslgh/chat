FROM node:10.16.0-alpine AS builder

WORKDIR /app

# Install all dependencies of the current project.
COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

# And then copy over node_modules, etc from that stage to the smaller image
FROM node:10.16.0-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3001

CMD ["node_modules/.bin/next", "start"]