const request = require('supertest');

jest.mock('../../src/logger', () => require('../../__mocks__/logger'));
jest.mock('../../src/middlewares/loggerMw', () => (req, res, next) => next());
jest.mock('../../src/connections/db-client');
jest.mock('../../src/env', () => ({
  jwtSecret: 'just-a-secret',
}));

const src = '../../src';

describe('POST /login', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('responds 200 with id and token when credentials are valid', done => {
    jest.setMock(`${src}/models/usersModel`, {
      getPassAndIdFromUsername: () => ({
        id: 1,
        password: 'valid-password',
      }),
    });

    const app = require(`${src}/app`);

    return request(app)
      .post('/login')
      .send({
        username: 'username',
        password: 'valid-password',
      })
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
          id: 1,
          token: 'HARD_CODED_VALID_TOKEN',
        });
        done();
      });
  });

  it('responds 401 with error message when the username does not exist', done => {
    jest.setMock(`${src}/models/usersModel`, {
      getPassAndIdFromUsername: () => {
        throw new Error('User does not exist');
      },
    });

    const app = require(`${src}/app`);

    return request(app)
      .post('/login')
      .send({
        username: 'non-existing-username',
        password: 'valid-password',
      })
      .then(res => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ message: 'Auth Failed' });
        done();
      });
  });

  it('responds 401 with error message when the password is not valid', done => {
    jest.setMock(`${src}/models/usersModel`, {
      getPassAndIdFromUsername: () => ({
        id: 1,
        password: 'valid-password',
      }),
    });

    const app = require(`${src}/app`);

    return request(app)
      .post('/login')
      .send({
        username: 'username',
        password: 'INVALID-password',
      })
      .then(res => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ message: 'Auth Failed' });
        done();
      });
  });
});
