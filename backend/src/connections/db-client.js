const { Client } = require('pg');
const sleep = require('util').promisify(setTimeout);
const { db } = require('../env');
const log = require('../logger');

let dbClient;

const createClient = () => {
  return new Client({
    host: 'postgres',
    user: db.user,
    password: db.password,
    database: db.name,
    port: db.port,
  });
};

/**
 * We need to wait a while until postgres is ready to recieve connections.
 * This function tries to connect to db.
 * @param {int} retries How many times will try to connect before giving up.
 */
const connectDb = async (retries = 10) => {
  while (retries) {
    try {
      const client = createClient();
      await client.connect();
      log.info('Connected to database successfully');
      dbClient = client;
      break;
    } catch (err) {
      retries -= 1;
      log.warn(`Failed to connect to db. Retries left: ${retries}`);

      if (retries) {
        await sleep(5000);
      } else {
        log.error(`Couldn't connect to db: ${err}`);
        throw err;
      }
    }
  }
};

module.exports = {
  connectDb,
  getClient: () => dbClient, // Singleton
};
