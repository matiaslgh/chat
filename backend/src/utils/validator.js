const { ValidationError } = require('../errors');

const { validationNames } = ValidationError;

const validateRequired = (obj, validations) => {
  Object.keys(validations).forEach(key => {
    const value = obj[key];
    const isRequired = validations[key].includes(validationNames.REQUIRED);

    if (isRequired && typeof value === 'undefined') {
      throw new ValidationError(key, value, validationNames.REQUIRED);
    }
  });

  return true;
};

const validators = {
  [validationNames.INTEGER]: value => Number.isInteger(value),
  [validationNames.OBJECT]: value => typeof value === 'object',
  [validationNames.STRING]: value => typeof value === 'string',
  // TODO: create url validator
};

/**
 * Given an object to validate, and an object with validations, this function
 * will ensure every specified validation is respected, if not a ValidationError
 * will be thrown.
 * E.g. obj = {test: 123}; validations: {test: ['required', 'integer', customValidationFunction]}
 * The customValidationFunction will receive the value and the key (123, 'test')
 * and will return true if it's valid or false otherwise.
 * It also can throw a custom Error.
 * @param {Object} obj to validate
 * @param {Object} validations with arrays of validations for every key
 */
const validate = (obj, validations) => {
  validateRequired(obj, validations);

  Object.keys(obj).forEach(key => {
    if (typeof validations[key] === 'undefined') {
      return true;
    }

    const valueToValidate = obj[key];

    validations[key]
      .filter(validationName => validationName !== validationNames.REQUIRED)
      .forEach(validationNameOrFunc => {
        let isOK;
        if (typeof validationNameOrFunc === 'function') {
          isOK = validationNameOrFunc(valueToValidate, key);
        } else {
          const validator = validators[validationNameOrFunc];
          isOK = validator(valueToValidate, key);
        }

        if (!isOK) {
          throw new ValidationError(key, valueToValidate, validationNameOrFunc);
        }
      });
  });
  return true;
};

module.exports = {
  validate,
  validateRequired,
  validationNames,
};
