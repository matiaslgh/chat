const express = require('express');

const applyMiddlewares = app => {
  app.use(require('./loggerMw'));
  app.use(express.json());
};

module.exports = applyMiddlewares;
