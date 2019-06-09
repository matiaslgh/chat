const { OK } = require('http-status-codes');
const model = require('../../models/messagesModel');
const log = require('../../logger');
const { handleCustomError } = require('../../errors');
const { TEXT, getTypeFromString } = require('./messageTypes');

async function createMessage(req, res) {
  const { sender, recipient, content } = req.body;
  // TODO: Validate sender exists
  // TODO: Validate recipient exists
  // TODO: Validate sender === user logged

  try {
    // TODO: content could be undefined
    const type = getTypeFromString(content.type);
    const { text, metadata } = content;
    const { id, timestamp } = await model.createMessage(sender, recipient, type, text);

    // TODO: Validate metadata format
    // TODO: Create whitelist for valid metadata
    if (metadata && type !== TEXT) {
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
