const { resWithStatusAndJson } = require('../../../testUtils');
const { UsernameAlreadyTakenError } = require('../../../../src/errors');

jest.mock('../../../../src/logger', () => require('../../../../__mocks__/logger'));

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

    it('Responds 409 with { message } when username already exists', done => {
      jest.setMock(`${src}/models/usersModel`, {
        createUser: username => {
          throw new UsernameAlreadyTakenError(username);
        },
      });
      const { createUser } = require(`${src}/controllers/usersController`);

      const res = resWithStatusAndJson(409, response => {
        expect(response).toEqual({
          message: `Cannot create user ${req.body.username} because it already exists`,
        });
        done();
      });
      createUser(req, res);
    });

    it('Responds 500 with { message } when there is an unknown error', done => {
      jest.setMock(`${src}/models/usersModel`, {
        createUser: () => {
          throw new Error('Your app has exploded!');
        },
      });
      const { createUser } = require(`${src}/controllers/usersController`);

      const res = resWithStatusAndJson(500, response => {
        expect(response).toEqual({
          message: 'Internal Server Error: Could not create user',
        });
        done();
      });
      createUser(req, res);
    });
  });
});
