const { CREATED, INTERNAL_SERVER_ERROR } = require('http-status-codes');
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
    if (!handleCustomError(e, res)) {
      log.error(`Error trying to create user ${username}: ${e}`);
      res.status(INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error: Could not create user',
      });
    }
  }
}

module.exports = {
  createUser,
};
