const { resWithStatusAndJson } = require('../../../testUtils');

jest.mock('../../../../src/logger', () => require('../../../../__mocks__/logger'));
jest.mock('jsonwebtoken');
jest.mock('../../../../src/env', () => ({
  jwtSecret: 'just-a-secret',
}));

const src = '../../../../src';

describe('Login controller', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('login', () => {
    it('Responds 200 with { token, id } on valid credentials', () => {
      jest.setMock(`${src}/models/usersModel`, {
        getPassAndIdFromUsername: () => ({
          id: 1,
          password: 'password',
        }),
      });
      const { login } = require(`${src}/controllers/loginController`);

      const req = {
        body: {
          username: 'username',
          password: 'password',
        },
      };

      const res = resWithStatusAndJson(200, response => {
        expect(response).toEqual({
          id: 1,
          token: 'HARD_CODED_VALID_TOKEN', // Matches with the mocked value
        });
      });
      login(req, res);
    });

    it('Responds 401 when the username does not exist', () => {
      jest.setMock(`${src}/models/usersModel`, {
        getPassAndIdFromUsername: () => {
          throw new Error('User does not exist');
        },
      });
      const { login } = require(`${src}/controllers/loginController`);

      const req = {
        body: {
          username: 'username',
          password: 'password',
        },
      };

      const res = resWithStatusAndJson(401, ({ message }) => {
        expect(message).toBeString();
      });
      login(req, res);
    });

    it('Responds 401 when the password is not valid', () => {
      jest.setMock(`${src}/models/usersModel`, {
        getPassAndIdFromUsername: () => ({
          id: 1,
          password: 'password',
        }),
      });
      const { login } = require(`${src}/controllers/loginController`);

      const req = {
        body: {
          username: 'username',
          password: 'wrong-pass',
        },
      };

      const res = resWithStatusAndJson(401, ({ message }) => {
        expect(message).toBeString();
      });
      login(req, res);
    });
  });
});
