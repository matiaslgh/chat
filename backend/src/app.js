const express = require('express');
const routes = require('./routes');
const { connectDb } = require('./connections/db-client');
const applyMiddlewares = require('./middlewares');
const { port } = require('./env');
const log = require('./logger');

const app = express();

applyMiddlewares(app);

app.use('/', routes);

// We'll wait until the connection with the db is made
(async () => {
  await connectDb();
  app.listen(port, () => {
    log.info(`Server listening on port: ${port}`);
  });
})();

module.exports = app;
