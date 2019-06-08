/**
 * Custom error to simplify the logging and http responding
 */
class ApplicationError extends Error {
  constructor(logMsg, responseMsg, status = 500, logLevel = 'error') {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.logMsg = `${this.name}: ${logMsg || 'Something went wrong'}`;

    this.responseMsg = responseMsg || 'Something went wrong';

    this.status = status;

    this.logLevel = logLevel;

    this.customError = true;
  }
}

module.exports = ApplicationError;
