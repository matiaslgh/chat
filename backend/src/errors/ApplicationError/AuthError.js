const ApplicationError = require('./index');
const { UNAUTHORIZED } = require('http-status-codes');

const defaultMsg = 'Auth Failed';

class AuthError extends ApplicationError {
  constructor(logMsg) {
    super(logMsg, defaultMsg, UNAUTHORIZED, 'trace');
  }
}

module.exports = AuthError;
