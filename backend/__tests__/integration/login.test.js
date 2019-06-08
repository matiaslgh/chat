const request = require('supertest');
const jwt = require('jsonwebtoken');

jest.mock('../../src/logger', () => require('../../__mocks__/logger'));
jest.mock('../../src/middlewares/loggerMw', () => (req, res, next) => next());
jest.mock('../../src/connections/db-client');
jest.mock('../../src/env', () => ({
  jwtSecret: 'just-a-secret',
}));
jest.unmock('jsonwebtoken');

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
        const idInToken = jwt.verify(res.body.token, 'just-a-secret').id;
        expect(res.body.id).toEqual(idInToken);
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
