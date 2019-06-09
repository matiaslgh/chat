const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../env');
const { getPassAndIdFromUsername } = require('../models/usersModel');
const log = require('../logger');
const { handleCustomError, AuthError } = require('../errors');

async function login(req, res) {
  const { username, password } = req.body;
  // TODO: Handle limit of tries

  try {
    // TODO: Check if the user is already logged in

    const { id, password: hashedPassword } = await getPassAndIdFromUsername(username);

    const samePassword = await bcrypt.compare(password, hashedPassword);

    if (!samePassword) {
      throw new AuthError(`User with id=${id} wrote a wrong password`);
    }

    const options = {
      expiresIn: '24h',
    };
    const token = jwt.sign({ id }, jwtSecret, options);

    log.trace(`User with id=${id} was successfully logged in`);
    res.status(200).json({
      id,
      token,
    });
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
