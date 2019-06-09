const { getClient } = require('../connections/db-client');
const { AuthError } = require('../errors');

const table = 'users';

async function getPassAndIdFromUsername(username) {
  // TODO: Check if user was passed
  // TODO: Check if the user is already logged in
  // TODO: Search into db
  if (username) {
    return {
      password: 'password123',
      id: 123,
    };
  }
  throw new AuthError('User does not exist');
}

async function createUser(username, password) {
  const res = await getClient().query(
    ` INSERT INTO ${table} (username, password, created_at, last_connection)
        VALUES ($1, $2, NOW(), NOW())
        RETURNING id`,
    [username, password]
  );

  return res.rows[0].id;
}

module.exports = {
  getPassAndIdFromUsername,
  createUser,
};
