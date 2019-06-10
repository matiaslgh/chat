const request = require('supertest');
const { mocksForIntegration } = require('../testUtils');

let jwtSecret;
let validPassword;

beforeAll(() => {
  const { env, validPassword: pass } = mocksForIntegration();
  jwtSecret = env.jwtSecret;
  validPassword = pass;
});

const src = '../../src';

describe('POST /login', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('responds 200 with id and token when credentials are valid', done => {
    const app = require(`${src}/app`);
    const jwt = require('jsonwebtoken');

    return request(app)
      .post('/login')
      .send({
        username: 'username',
        password: validPassword,
      })
      .then(res => {
        expect(res.statusCode).toBe(200);
        const idInToken = jwt.verify(res.body.token, jwtSecret).id;
        expect(res.body.id).toEqual(idInToken);
        done();
      });
  });

  it('responds 401 with error message when the username does not exist', done => {
    const { AuthError } = require(`${src}/errors`);
    jest.setMock(`${src}/models/usersModel`, {
      getPassAndIdFromUsername: () => {
        throw new AuthError('User does not exist');
      },
    });

    const app = require(`${src}/app`);

    return request(app)
      .post('/login')
      .send({
        username: 'non-existing-username',
        password: validPassword,
      })
      .then(res => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ message: 'Auth Failed' });
        done();
      });
  });

  it('responds 401 with error message when the password is not valid', done => {
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

  // TODO: this test
  // it('responds 200 with id and the same token the user has if they are already logged in', done => {

  // TODO: this test
  // it('responds 200 with id and the same token the user has if they are already logged in', done => {
});
