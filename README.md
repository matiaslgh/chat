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