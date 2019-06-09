const { getClient } = require('../connections/db-client');

async function testDbHealth() {
  const { rows } = await getClient().query('SELECT 1 AS ok');
  return rows[0].ok;
}

module.exports = {
  testDbHealth,
};
