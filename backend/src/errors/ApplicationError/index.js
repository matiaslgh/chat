/**
 * Custom error to simplify the logging and http responding
 */
class ApplicationError extends Error {
  constructor(privateMessage, publicMessage, status = 500, logLevel = 'error') {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.privateMessage = `${this.name}: ${privateMessage || 'Something went wrong'}`;

    this.publicMessage = publicMessage || 'Something went wrong';

    this.status = status;

    this.logLevel = logLevel;

    this.customError = true;
  }
}

module.exports = ApplicationError;
