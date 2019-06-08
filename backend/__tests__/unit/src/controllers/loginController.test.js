const { resWithStatusAndJson } = require('../../../testUtils');

jest.mock('../../../../src/logger', () => require('../../../../__mocks__/logger'));
jest.mock('jsonwebtoken');
jest.mock('../../../../src/env', () => ({
  jwtSecret: 'just-a-secret',
}));
jest.mock('../../../../src/errors');

const src = '../../../../src';

describe('Login controller', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('login', () => {
    const req = {
      body: {
        username: 'username',
        password: 'password',
      },
    };

    it('Responds 200 with { token, id } on valid credentials', done => {
      jest.setMock(`${src}/models/usersModel`, {
        getPassAndIdFromUsername: () => ({
          id: 1,
          password: 'password',
        }),
      });
      const { login } = require(`${src}/controllers/loginController`);

      const res = resWithStatusAndJson(200, response => {
        expect(response).toEqual({
          id: 1,
          token: 'HARD_CODED_VALID_TOKEN', // Matches with the mocked value
        });
        done();
      });
      login(req, res);
    });

    it('Calls handleCustomError if password is not correct', async done => {
      jest.setMock(`${src}/models/usersModel`, {
        getPassAndIdFromUsername: () => ({
          id: 1,
          password: 'password',
        }),
      });

      const { login } = require(`${src}/controllers/loginController`);
      const { handleCustomError, AuthError } = require(`${src}/errors`);

      const req = {
        body: {
          username: 'username',
          password: 'wrong-pass',
        },
      };

      const res = 'fake response';
      await login(req, res);

      const {
        error,
        response,
        defaultLogMsg,
        defaultResponseMsg,
      } = handleCustomError.mock.calls[0][0];

      expect(error).toBeInstanceOf(AuthError);
      expect(response).toEqual(res);
      expect(defaultLogMsg).toEqual(`Error trying to login: ${error}`);
      expect(defaultResponseMsg).toEqual('Internal Server Error: Could not log in');
      done();
    });

    it('Handles errors with handleCustomError', async done => {
      jest.setMock(`${src}/models/usersModel`, {
        getPassAndIdFromUsername: () => {
          throw new Error('There was an error');
        },
      });

      const { login } = require(`${src}/controllers/loginController`);
      const { handleCustomError } = require(`${src}/errors`);

      const res = 'fake response';
      await login(req, res);

      const {
        error,
        response,
        defaultLogMsg,
        defaultResponseMsg,
      } = handleCustomError.mock.calls[0][0];

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('There was an error');
      expect(response).toEqual(res);
      expect(defaultLogMsg).toEqual(`Error trying to login: ${error}`);
      expect(defaultResponseMsg).toEqual('Internal Server Error: Could not log in');
      done();
    });
  });
});
