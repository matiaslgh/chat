const { getClient } = require('../connections/db-client');
const { AuthError } = require('../errors');

const table = 'users';

async function getPassAndIdFromUsername(username) {
  const { rows } = await getClient().query(
    `SELECT id, password FROM ${table} WHERE username = $1`,
    [username]
  );

  if (rows[0]) {
    return rows[0];
  }

  throw new AuthError('User does not exist');
}

async function createUser(username, password) {
  const { rows } = await getClient().query(
    ` INSERT INTO ${table} (username, password, created_at, last_connection)
        VALUES ($1, $2, NOW(), NOW())
        RETURNING id`,
    [username, password]
  );

  return rows[0].id;
}

module.exports = {
  getPassAndIdFromUsername,
  createUser,
};
