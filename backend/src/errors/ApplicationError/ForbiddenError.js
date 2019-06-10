const ApplicationError = require('./index');
const { FORBIDDEN } = require('http-status-codes');

const defaultMsg = 'You do not have permissions to do this action';

class ForbiddenError extends ApplicationError {
  constructor(logMsg) {
    super(logMsg, defaultMsg, FORBIDDEN, 'info');
  }
}

module.exports = ForbiddenError;
