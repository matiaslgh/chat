const express = require('express');
const routes = require('./routes');
const { connectDb } = require('./connections/db-client');

const app = express();

app.use(express.json());
app.use('/', routes);

const port = process.env.PORT || 3000;

// We'll wait until the connection with the db is made
(async () => {
  await connectDb();
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port: ${port}`);
  });
})();
