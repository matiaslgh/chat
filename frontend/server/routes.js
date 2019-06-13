const nextRoutes = require('next-routes');

const routes = nextRoutes();

routes.add('user', '/user/:id');

module.exports = routes;
