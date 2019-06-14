const { CREATED, OK } = require('http-status-codes');
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

// TODO: Eventually, it should return only the currentUser's friends
async function getUsers(req, res) {
  try {
    const users = await model.getUsers();
    // TODO: Check if is online in redis and remove the line below
    const usersWithOnlineField = users.map(user =>
      Math.random() > 0.5 ? { ...user, isOnline: false } : { ...user, isOnline: true }
    );
    return res.status(OK).json(usersWithOnlineField);
  } catch (e) {
    handleCustomError({
      error: e,
      response: res,
      defaultLogMsg: `Error trying to get users: ${e}`,
      defaultResponseMsg: 'Internal Server Error: Could not get users',
    });
  }
}

module.exports = {
  createUser,
  getUsers,
};
