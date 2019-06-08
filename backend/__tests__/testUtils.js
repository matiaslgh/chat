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

module.exports = {
  resWithStatusAndJson,
};
