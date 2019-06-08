const { CREATED } = require('http-status-codes');
const model = require('../models/usersModel');
const log = require('../logger');
const { handleCustomError } = require('../errors');

async function createUser(req, res) {
  const { username, password } = req.body;

  try {
    const { id } = await model.createUser(username, password);

    log.trace(`User ${id} has been successfully created`);
    return res.status(CREATED).json({
      id,
    });
  } catch (e) {
    handleCustomError({
      error: e,
      response: res,
      defaultLogMsg: `Error trying to create user ${username}: ${e}`,
      defaultResponseMsg: 'Internal Server Error: Could not create user',
    });
  }
}

module.exports = {
  createUser,
};
