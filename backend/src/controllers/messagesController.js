const { OK } = require('http-status-codes');
const model = require('../models/messagesModel');
const log = require('../logger');
const { handleCustomError, ForbiddenError } = require('../errors');

async function createMessage(req, res) {
  const { userId, body } = req;
  const { sender, recipient, content } = body;

  try {
    if (userId != sender) {
      throw new ForbiddenError(`User ${userId} tried to send a message as user ${sender}`);
    }
    // TODO: content could be undefined
    const { type, text, ...metadata } = content;
    const { id, timestamp } = await model.createMessage(sender, recipient, type, text);

    // TODO: Validate metadata format
    // TODO: Validate if required metadata is present
    // TODO: Create whitelist for valid metadata
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
