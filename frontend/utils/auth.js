import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

/**
 * Creates a cookie with the token + redirect to the app itself
 * @param {Object} obj with token
 */
export const setCookieAndRedirect = async ({ token }) => {
  // TODO: Use only one source of truth for expiration (it must match with the server)
  cookie.set('token', token, { expires: 1 }); // 1 day
  Router.push('/');
  // TODO: if /login had a query, redirect to specific conversation
};

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
