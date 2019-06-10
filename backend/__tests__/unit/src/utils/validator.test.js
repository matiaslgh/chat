const validator = require('../../../../src/utils/validator');
const { ValidationError } = require('../../../../src/errors');

jest.mock('../../../../src/logger', () => require('../../../../__mocks__/logger'));
jest.mock('../../../../src/errors');

// TODO: Check this, they are not unit tests
describe('Validator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('validate(...)', () => {
    const { validate } = validator;

    it('returns true if everything is ok', () => {
      const validations = {
        sender: ['required', 'integer'],
        recipient: ['required', 'integer'],
        content: ['required', 'object'],
      };

      const objToValidate = {
        sender: 1,
        recipient: 2,
        content: {
          type: 'text',
          text: 'Hello!',
        },
      };

      expect(validate(objToValidate, validations)).toBeTrue();
    });

    it('does not fail if a non-required field is not present', () => {
      const validations = {
        sender: ['integer'],
      };

      const objToValidate = {};

      expect(validate(objToValidate, validations)).toBeTrue();
    });

    it('throws a ValidationError when a required field is not present', () => {
      const validations = {
        sender: ['required', 'integer'],
        recipient: ['required', 'integer'],
      };

      const objToValidate = {
        recipient: '',
      };

      expect(() => validate(objToValidate, validations)).toThrow();
      expect(ValidationError).toHaveBeenCalledWith('sender', undefined, 'required');
    });

    it('throws a ValidationError when a field must be an integer and it is not', () => {
      const validations = {
        sender: ['required', 'integer'],
        recipient: ['required', 'integer'],
      };

      const objToValidate = {
        sender: 123,
        recipient: 'not an int',
      };

      expect(() => validate(objToValidate, validations)).toThrow();
      expect(ValidationError).toHaveBeenCalledWith('recipient', 'not an int', 'integer');
    });

    it('throws a ValidationError when a field must be an object and it is not', () => {
      const validations = {
        content: ['object'],
      };

      const objToValidate = {
        content: 123,
      };

      expect(() => validate(objToValidate, validations)).toThrow();
      expect(ValidationError).toHaveBeenCalledWith('content', 123, 'object');
    });

    it('does not validate a key if it is not present in the validations object', () => {
      const validations = {
        nonRequiredObject: ['object'],
      };

      const objToValidate = {
        nonForbiddenValue: 123,
      };

      expect(validate(objToValidate, validations)).toBeTrue();
    });

    it('accepts custom function validators in the validation object', () => {
      const customEnumValidator = value => ['valid1', 'valid2', 'valid3'].includes(value);

      const validation = {
        enum: ['required', customEnumValidator],
      };

      const invalidObject = {
        enum: 'invalidValue',
      };

      expect(() => validate(invalidObject, validation)).toThrow();

      const validObject = {
        enum: 'valid2',
      };

      expect(validate(validObject, validation)).toBeTrue();
    });
  });
});
