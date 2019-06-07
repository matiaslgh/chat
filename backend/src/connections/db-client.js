const { Client } = require('pg');
const sleep = require('util').promisify(setTimeout);

let dbClient;

const createClient = () => {
  return new Client({
    user: process.env.POSTGRES_USER,
    host: 'postgres',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
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
      console.log('Connected to database successfully');
      dbClient = client;
      break;
    } catch (err) {
      retries -= 1;
      console.log(`Failed to connect to db. Retries left: ${retries}`);

      if (retries) {
        await sleep(5000);
      } else {
        throw err;
      }
    }
  }
};

module.exports = {
  connectDb,
  getClient: () => dbClient, // Singleton
};
