const express = require('express');

const applyMiddlewares = app => {
  app.use(require('cors')()); // TODO: Enable only frontend... maybe..
  app.use(require('./loggerMw'));
  app.use(require('./extractUserIdFromTokenMw'));
  // TODO: Add middleware to avoid logging out an active user after token expiration
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(require('./globalErrorHandlerMw'));
};

module.exports = applyMiddlewares;
