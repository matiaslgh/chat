# Simple Chat #

Basic chat service that allows users send messages to each other.

## Technologies ##
- Node.js
- Express
- PostgreSQL
- Docker
- Jest

## Dependencies

The following requirements are needed to run the project locally:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Sync](http://docker-sync.io/) (Only for development)

## Before beginning

```shell
git clone https://github.com/matiaslgh/chat.git chat-lgh
cd chat
```

## Start in development mode

```shell
docker-sync-stack start
```

This will bring all the needed Docker containers up and sync Backend and Frontend so changes are updated when working on the code on your local environment.

Note: If previously you have run the project in production mode, you will need to remove the docker images/containers before running this command.

## Start in production mode
```shell
docker-compose up
```

This will bring all the needed Docker containers up.

Note: If previously you have run the project in development mode, you will need to run `docker-compose up --build` instead, to rebuild the docker images and get the production container.

## Notes
The .env files were uploaded to this repo to simplify the process of showing/running this project. In a real world project they must be in .gitignore and provide an example.env instead

## Backend

### Run tests
In the backend:
```shell
cd backend
```

Run unit tests
```shell
npm run test:unit
```

Run integration tests
```shell
npm run test:integration
```

Run all the tests
```shell
npm test
```

### Logging
I use [pino](http://getpino.io/#/) for logging

For production only, I use [express-pino-logger](https://www.npmjs.com/package/express-pino-logger) as a middleware to log the requests and [pino-arborsculpture](https://www.npmjs.com/package/pino-arborsculpture) to be able to modify the log level on runtime by editing the file `./backend/logLevel.json`

For development only, I use [pino-pretty](https://www.npmjs.com/package/pino-pretty) and a custom middleware to log the requests.

This difference is because during development I don't care about a super verbose logging, instead it's better a concise and pretty message. For production we don't need a human-readable logging, since we would use a different tool to analyze/visualize them, e.g. kibana
