FROM node:10.16.0-alpine

WORKDIR /app

# Override the base log level (info)
ENV NPM_CONFIG_LOGLEVEL warn

# Install `forever`
RUN npm install -g forever

# Install all dependencies of the current project.
COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["forever", "src/app.js"]