const { BAD_REQUEST } = require('http-status-codes');
const ApplicationError = require('./index');

class ValidationError extends ApplicationError {
  constructor(key, value, type, other = {}) {
    const { INTEGER, OBJECT, REQUIRED, STRING } = ValidationError.validationNames;
    let message;
    switch (type) {
      case INTEGER:
        message = `Field ${key} must be an integer`;
        break;
      case OBJECT:
        message = `Field ${key} must be an object`;
        break;
      case REQUIRED:
        message = `Field ${key} is required`;
        break;
      case STRING:
        message = `Field ${key} must be a string`;
        break;
      default:
        message = 'The provided data is wrong';
        break;
    }
    if (!key || !value) {
      super(other.logMessage, message, BAD_REQUEST, other.logLevel || 'debug');
    } else {
      super(`${key}:${value} breaks constraint: ${type}`, message, BAD_REQUEST, 'debug');
    }
  }
}

ValidationError.validationNames = {
  INTEGER: 'integer',
  OBJECT: 'object',
  REQUIRED: 'required',
  STRING: 'string',
};

module.exports = ValidationError;
