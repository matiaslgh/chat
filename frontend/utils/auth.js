import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

/**
 * Remove the token from the cookie + Redirect to /login + TODO: logs out from server too
 */
export const logout = () => {
  cookie.remove('token');
  Router.push('/login');
  // TODO: make call to logout in server
};

/**
 * Redirects to /login if the token is not present.
 * Returns the token if everything is ok.
 * @param {Object} ctx Context could be server or browser
 */
export const auth = ctx => {
  const { token } = nextCookie(ctx);

  // ctx.req is available only in the server
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return null;
  }

  // This happen only in client side
  if (!token) {
    Router.push('/login');
  }

  return token;
};

/**
 * Extract current user data from cookies
 * either the context is in the server or the browser
 * @param {Object} ctx Context could be server or browser
 */
export const getCurrentUser = ctx => {
  const { token, userId } = nextCookie(ctx);
  if (!token || !userId) {
    return null;
  }
  return { token, id: userId };
};
