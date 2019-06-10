const { OK } = require('http-status-codes');
const model = require('../../models/messagesModel');
const log = require('../../logger');
const { handleCustomError } = require('../../errors');
const { TEXT, getTypeFromString } = require('./messageTypes');

async function createMessage(req, res) {
  const { sender, recipient, content } = req.body;
  // TODO: Validate sender === user logged

  try {
    // TODO: content could be undefined
    const { type, text, ...metadata } = content;
    const typeInt = getTypeFromString(type);
    const { id, timestamp } = await model.createMessage(sender, recipient, typeInt, text);

    // TODO: Validate metadata format
    // TODO: Create whitelist for valid metadata
    if (metadata && typeInt !== TEXT) {
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

module.exports = {
  createMessage,
};
