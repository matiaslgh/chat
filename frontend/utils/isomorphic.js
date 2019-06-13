import Router from 'next/router';

export const redirect = (pathname, { req, res }) => {
  const isServer = !!req;

  if (isServer) {
    res.writeHead(302, { Location: pathname });
    res.end();
  } else {
    Router.push(pathname);
  }
};
