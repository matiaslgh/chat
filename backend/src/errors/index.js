const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const log = require('../logger');

/**
 * Logs and responds using the data in the error object
 * @param {ApplicationError} error ApplicationError or another error that extends it
 * @param {Object} response to send to the user with a message + status error
 */
function handleCustomError({ error, response, defaultLogMsg, defaultResponseMsg }) {
  if (error.customError) {
    log[error.logLevel](error.privateMessage);
    response.status(error.status).json({
      message: error.publicMessage,
    });
  } else {
    log.error(defaultLogMsg);
    response.status(INTERNAL_SERVER_ERROR).json({
      message: defaultResponseMsg,
    });
  }
}

module.exports = {
  ApplicationError: require('./ApplicationError'),
  UsernameAlreadyTakenError: require('./ApplicationError/UsernameAlreadyTakenError'),
  handleCustomError,
};
