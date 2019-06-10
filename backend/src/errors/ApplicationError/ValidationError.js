const { BAD_REQUEST } = require('http-status-codes');
const ApplicationError = require('./index');

class ValidationError extends ApplicationError {
  constructor(key, value, type) {
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
        message = `Field ${key} must be an object`;
        break;
      default:
        message = 'The provided data is wrong';
        break;
    }
    super(`${key}:${value} breaks constraint: ${type}`, message, BAD_REQUEST, 'debug');
  }
}

ValidationError.validationNames = {
  INTEGER: 'integer',
  OBJECT: 'object',
  REQUIRED: 'required',
  STRING: 'string',
};

module.exports = ValidationError;
