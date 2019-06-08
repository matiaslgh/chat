const express = require('express');

const applyMiddlewares = app => {
  app.use(require('./loggerMw'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

module.exports = applyMiddlewares;
