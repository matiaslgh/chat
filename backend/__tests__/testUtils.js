/**
 * Returns a fake response object with the method status.
 * Pass it to a route/middleware on testing.
 * Will validate if it was called with the passed status
 * Will run the passed callback, where you should assert some extra things.
 * @param {int} status Expected status
 * @param {Function} jsonCb Callback to run when .json is called
 */
const resWithStatusAndJson = (status, jsonCb) => ({
  status: num => {
    expect(num).toBe(status);
    return {
      json: response => {
        jsonCb(response);
      },
    };
  },
});

/**
 * Mock usersModel's method to provide a valid hashed password
 * @returns {string} valid password un-hashed
 */
const mockGetPassAndIdFromUsernameWithNoError = () => {
  jest.setMock('../src/models/usersModel', {
    getPassAndIdFromUsername: () => ({
      id: 1,
      password: '$2a$10$Xj.4tbIL8hautFE4WNEo7./jeqfPSnYvJbYOS.OLiF1nvsZppGiIS',
    }),
  });
  return 'valid-password';
};

/**
 * Mock dbClient and returns the query method to make assertions
 */
const mockDbClientAndReturnMockedDbQuery = () => {
  const query = jest.fn();

  jest.setMock('../src/connections/db-client', {
    connectDb: jest.fn(),
    getClient: () => ({
      query,
    }),
  });

  return query;
};

/**
 * Mock dbClient and returns the query method to make assertions
 */
const mockEnvAndReturnValues = () => {
  const config = {
    isDev: false,
    jwtSecret: 'just-a-secret',
  };

  jest.setMock('../src/env', config);

  return config;
};

/**
 * Mock several resources. Useful for integration tests.
 * Returns object with elements to make assertions
 */
const mocksForIntegration = () => {
  const env = mockEnvAndReturnValues();
  // TODO: This should work, but it doesn't: jest.mock('../src/logger');
  jest.mock('../src/logger', () => require('../__mocks__/logger'));
  jest.mock('../src/middlewares/loggerMw', () => (req, res, next) => next());
  jest.unmock('jsonwebtoken');

  const dbQuery = mockDbClientAndReturnMockedDbQuery();
  const validPassword = mockGetPassAndIdFromUsernameWithNoError();

  return {
    env,
    dbQuery,
    validPassword,
  };
};

/**
 * Since queries are written as template strings, they have spaces and
 * lines break. This method is useful to remove that noise and then
 * make assertions over the returned value.
 * @param {string} str
 */
const cleanQuery = str =>
  str
    .trim()
    .replace(/\n/g, '') // remove \n
    .replace(/\s+/g, ' '); // replace multiple white spaces by only one

module.exports = {
  cleanQuery,
  mockDbClientAndReturnMockedDbQuery,
  mockEnvAndReturnValues,
  mocksForIntegration,
  mockGetPassAndIdFromUsernameWithNoError,
  resWithStatusAndJson,
};
