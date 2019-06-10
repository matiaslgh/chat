const express = require('express');

const applyMiddlewares = app => {
  app.use(require('./loggerMw'));
  app.use(require('./extractUserIdFromTokenMw'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(require('./globalErrorHandlerMw'));
};

module.exports = applyMiddlewares;
