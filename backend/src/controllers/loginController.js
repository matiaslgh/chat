const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../env');
const { getPassAndIdFromUsername } = require('../models/usersModel');
const log = require('../logger');
const { handleCustomError, AuthError } = require('../errors');

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const { id, password: actualPassword } = await getPassAndIdFromUsername(username);

    if (actualPassword === password) {
      const options = {
        expiresIn: '24h',
      };
      const token = jwt.sign({ id }, jwtSecret, options);

      log.trace(`User with id=${id} was successfully logged in`);
      return res.status(200).json({
        id,
        token,
      });
    }

    // TODO: Handle limit of tries

    throw new AuthError(`User with id=${id} wrote a wrong password`);
  } catch (e) {
    handleCustomError({
      error: e,
      response: res,
      defaultLogMsg: `Error trying to login: ${e}`,
      defaultResponseMsg: 'Internal Server Error: Could not log in',
    });
  }
}

module.exports = {
  login,
};
