const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../env');
const { getPassAndIdFromUsername } = require('../models/usersModel');
const log = require('../logger');

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

    log.trace(`User with id=${id} wrote a wrong password`);
    return res.status(401).json({ message: 'Auth Failed' });
  } catch (e) {
    log.trace(`Error trying to login: ${e}`);
    res.status(401).json({ message: 'Auth Failed' });
  }
}

module.exports = {
  login,
};
