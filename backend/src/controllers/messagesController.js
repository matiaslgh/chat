const { OK } = require('http-status-codes');
const model = require('../models/messagesModel');
const log = require('../logger');
const { handleCustomError, ForbiddenError } = require('../errors');
const { validate } = require('../utils/validator');

const conditionalShapeValidation = content => {
  validate(content, { type: ['required', 'string'] });
  const { type } = content;

  // TODO: This should not be hard-coded
  if (type === 'text') {
    validate(content, { text: ['required', 'string'] });
  }
  if (type === 'image') {
    validate(content, {
      url: ['required', 'string'], // TODO: create url validator
      height: ['required', 'integer'],
      width: ['required', 'integer'],
    });
  }
  if (type === 'video') {
    // TODO: youtube/vimeo should not be hard-coded
    const enumValidator = value => ['youtube', 'vimeo'].includes(value);

    validate(content, {
      url: ['required', 'string'], // TODO: create url validator
      source: ['required', 'string', enumValidator],
    });
  }
  return true;
};

const createMessageValidation = obj => {
  validate(obj, {
    sender: ['required', 'integer'],
    recipient: ['required', 'integer'],
    content: ['required', 'object', conditionalShapeValidation],
  });
};

async function createMessage(req, res) {
  const { userId, body } = req;
  const { sender, recipient, content } = body;

  try {
    createMessageValidation({ sender, recipient, content });

    if (userId != sender) {
      throw new ForbiddenError(`User ${userId} tried to send a message as user ${sender}`);
    }

    const { type, text, ...metadata } = content;
    const { id, timestamp } = await model.createMessage(sender, recipient, type, text);

    // TODO: Remove hard-coded 'text' this should be got from the db
    //       and cached to compare there
    if (metadata && type !== 'text') {
      await model.createMetadata(id, metadata);
    }

    log.trace(`${sender} sent message ${id} to ${recipient}`);
    res.status(OK).json({
      id,
      timestamp,
    });
  } catch (e) {
    handleCustomError({
      error: e,
      response: res,
      defaultLogMsg: `Could not create message: ${e}`,
      defaultResponseMsg: 'Internal Server Error: Could not create message',
    });
  }
}

async function getMessages(req, res) {
  const { query, userId } = req;
  // TODO: Create file of defaults
  const { recipient, start, limit = 100 } = query;
  // TODO: Validate they are not undefined
  try {
    validate(
      { recipient, start, limit },
      {
        recipient: ['required', 'integer'],
        start: ['required', 'integer'],
        limit: ['integer'],
      }
    );
    const messages = await model.getMessages(userId, recipient, start, limit);

    res.status(OK).json({ messages });
  } catch (e) {
    handleCustomError({
      error: e,
      response: res,
      defaultLogMsg: `Could not get messages: ${e}`,
      defaultResponseMsg: 'Internal Server Error: Could not get messages',
    });
  }
}

module.exports = {
  createMessage,
  getMessages,
};
