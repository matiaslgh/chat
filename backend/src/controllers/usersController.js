const { CREATED } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const model = require('../models/usersModel');
const log = require('../logger');
const { handleCustomError } = require('../errors');

async function createUser(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = await model.createUser(username, hashedPassword);

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
