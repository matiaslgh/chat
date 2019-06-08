const ApplicationError = require('./index');
const { CONFLICT } = require('http-status-codes');

/**
 * Throw this error when trying to create an existing user
 */
class UsernameAlreadyTakenError extends ApplicationError {
  constructor(username) {
    const message = `Cannot create user ${username} because it already exists`;
    super(message, message, CONFLICT, 'trace');
  }
}

module.exports = UsernameAlreadyTakenError;
