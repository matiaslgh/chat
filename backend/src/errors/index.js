const log = require('../logger');

/**
 * Logs and responds using the data in the error object
 * @param {ApplicationError} error ApplicationError or another error that extends it
 * @param {Object} response to send to the user with a message + status error
 */
function handleCustomError(error, response) {
  if (error.customError) {
    log[error.logLevel](error.privateMessage);
    response.status(error.status).json({
      message: error.publicMessage,
    });
    return true;
  }
  return false;
}

module.exports = {
  ApplicationError: require('./ApplicationError'),
  UsernameAlreadyTakenError: require('./ApplicationError/UsernameAlreadyTakenError'),
  handleCustomError,
};
