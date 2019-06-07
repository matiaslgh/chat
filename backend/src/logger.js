const pino = require('pino');
const { isDev } = require('./env');

const devConfig = {
  prettyPrint: {
    levelFirst: true,
  },
};

const prodConfig = {};

const log = pino(isDev ? devConfig : prodConfig);

// change logging level on runtime by editing the files described in ${path}
if (!isDev) {
  const Arborsculpt = require('pino-arborsculpture');
  const arbor = new Arborsculpt({
    path: '../logLevel.json',
    loggers: [log],
    interval: 60000, // 1 minute
  });

  arbor.on('error', function(err) {
    log.error(err);
  });
}

module.exports = log;
