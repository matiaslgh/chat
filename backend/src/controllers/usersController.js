const { CREATED } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const model = require('../models/usersModel');
const log = require('../logger');
const { handleCustomError } = require('../errors');
const { validate } = require('../utils/validator');

async function createUser(req, res) {
  const { username, password } = req.body;

  try {
    validate(
      { username, password },
      {
        username: ['required', 'string'], // TODO: Validate username (min/max length, not null, etc)
        password: ['required', 'string'], // TODO: Validate password requirements (length, not null, must contain X char, etc)
      }
    );
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
