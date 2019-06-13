import cookie from 'js-cookie';

/**
 * Creates a cookies by passing an object
 * E.g. { userId: 1, token: 2 } will create 2 cookies with those names and values
 * @param {Object} obj with values to create cookies
 * @param {number} expires optional expiration time
 */
export const setCookies = async (obj, expires = 1) => {
  Object.keys(obj).forEach(key => {
    cookie.set(key, obj[key], { expires });
  });
};
