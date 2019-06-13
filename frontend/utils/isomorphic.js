import Router from 'next/router';

/**
 * Isomorphic function to redirect either in the server or the browser
 * @param {string} pathname relative url
 * @param {Object} context which has req and res if is the server
 */
export const redirect = (pathname, { req, res }) => {
  const isServer = !!req;

  if (isServer) {
    res.writeHead(302, { Location: pathname });
    res.end();
  } else {
    Router.push(pathname);
  }
};
