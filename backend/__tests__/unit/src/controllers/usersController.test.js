const { resWithStatusAndJson } = require('../../../testUtils');

jest.mock('../../../../src/logger', () => require('../../../../__mocks__/logger'));
jest.mock('../../../../src/errors');

const src = '../../../../src';

describe('Users controller', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('createUser', () => {
    const req = {
      body: {
        username: 'username',
        password: 'password',
      },
    };

    it('Responds 201 with { id } when creates the user', done => {
      jest.setMock(`${src}/models/usersModel`, {
        createUser: () => ({
          id: 123,
        }),
      });
      const { createUser } = require(`${src}/controllers/usersController`);

      const res = resWithStatusAndJson(201, response => {
        expect(response).toEqual({
          id: 123,
        });
        done();
      });
      createUser(req, res);
    });

    it('Handles errors with handleCustomError', async done => {
      jest.setMock(`${src}/models/usersModel`, {
        createUser: () => {
          throw new Error('There was an error');
        },
      });
      const { createUser } = require(`${src}/controllers/usersController`);
      const { handleCustomError } = require(`${src}/errors`);

      const res = 'fake response';
      await createUser(req, res);

      const {
        error,
        response,
        defaultLogMsg,
        defaultResponseMsg,
      } = handleCustomError.mock.calls[0][0];

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('There was an error');
      expect(response).toEqual(res);
      expect(defaultLogMsg).toEqual(`Error trying to create user ${req.body.username}: ${error}`);
      expect(defaultResponseMsg).toEqual('Internal Server Error: Could not create user');
      done();
    });
  });
});
