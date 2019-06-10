const UsernameAlreadyTakenError = require('../../../src/errors/ApplicationError/UsernameAlreadyTakenError');
const { resWithStatusAndJson } = require('../../testUtils');

jest.mock('../../../src/logger', () => require('../../../__mocks__/logger'));

const src = '../../../src';

describe('Errors', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('handleCustomError(...)', () => {
    const defaultLogMsg = 'default log message';
    const defaultResponseMsg = 'default response message';

    it('logs and responds with the provided data when the error is custom', done => {
      const { handleCustomError } = require(`${src}/errors`);

      const log = require(`${src}/logger`);

      const username = 'USERNAME';
      const error = new UsernameAlreadyTakenError(username);
      const { status, logMsg, responseMsg, logLevel } = error;

      const response = resWithStatusAndJson(status, res => {
        expect(res).toEqual({
          message: responseMsg,
        });
        expect(log[logLevel]).toHaveBeenCalledWith(logMsg);
        done();
      });

      handleCustomError({
        error,
        response,
        defaultLogMsg,
        defaultResponseMsg,
      });
    });

    it('logs and responds with default data when the error is NOT custom', done => {
      const { handleCustomError } = require(`${src}/errors`);
      const log = require(`${src}/logger`);

      const error = new Error('Non-custom error');

      const response = resWithStatusAndJson(500, res => {
        expect(res).toEqual({
          message: defaultResponseMsg,
        });
        expect(log.error).toHaveBeenCalledWith(defaultLogMsg);
        done();
      });

      handleCustomError({
        error,
        response,
        defaultLogMsg,
        defaultResponseMsg,
      });
    });
  });

  // TODO: test custom errors like AuthError, ForbiddenError, and so on
});
