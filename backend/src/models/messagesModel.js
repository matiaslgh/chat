const { FOREIGN_KEY_VIOLATION } = require('pg-error-constants');
const { getClient } = require('../connections/db-client');
const { ValidationError } = require('../errors');

async function createMessage(sender, recipient, type, text = null) {
  try {
    const { rows } = await getClient().query(
      ` INSERT INTO messages (sender, recipient, type, text, created_at)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING id, created_at AS timestamp`,
      [sender, recipient, type, text]
    );
    const { id, timestamp } = rows[0];

    return {
      id,
      timestamp,
    };
  } catch (e) {
    switch (e.code) {
      case FOREIGN_KEY_VIOLATION:
        throw new ValidationError(null, null, null, {
          logMessage: `Could not create message with sender: ${sender} and recipient ${recipient}: ${e.detail}`,
          logLevel: 'info',
        });
      default:
        throw new ValidationError(null, null, null, {
          logMessage: `Could not create message with sender: ${sender} and recipient ${recipient}: ${e}`,
          logLevel: 'error',
        });
    }
  }
}

const buildMetadataInsert = (id, metadata) => {
  const metadataKeys = Object.keys(metadata);

  let params = '';
  let values = [];

  for (let i = 0; i < metadataKeys.length; i++) {
    params += ` ($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`;
    if (i !== metadataKeys.length - 1) {
      params += ',';
    }
    values.push(id, metadataKeys[i], metadata[metadataKeys[i]]);
  }

  return [params, values];
};

async function createMetadata(id, metadata) {
  const [params, values] = buildMetadataInsert(id, metadata);

  return await getClient().query(
    `INSERT INTO metadata (message_id, name, value) VALUES${params}`,
    values
  );
}

// TODO: Too complex, save metadata as json (maybe) or messages in ElasticSearch ?
async function getMessages(userId, recipient, start, limit) {
  const createContent = () => {
    const jsonMessageType = `('{"type": "' || m1.type || '"}')::jsonb`;
    const metadataValuesAsJson = 'json_object_agg(m2.name, m2.value)';
    const ignoreNull = 'WHERE m2.name IS NOT NULL';
    const jsonContentForTextMessage = `('{"type":"' || m1.type || '", "text": "' || m1.text || '"}')::json`;
    return `(${jsonMessageType} || COALESCE(${metadataValuesAsJson} FILTER (${ignoreNull}), ${jsonContentForTextMessage})::jsonb) AS content`;
  };

  const isAMessageBetween = (user1, user2) =>
    `((sender = ${user1} AND recipient = ${user2}) OR (sender = ${user2} AND recipient = ${user1}))`;

  const filterMessagesWhere = `WHERE ${isAMessageBetween('$1', '$2')} AND id >= $3`;

  const filteredMessagesSQ = `SELECT * FROM messages ${filterMessagesWhere} ORDER BY created_at DESC LIMIT $4`;

  const SELECT = `SELECT m1.id, m1.created_at AS timestamp, m1.sender, m1.recipient, ${createContent()}`;
  const FROM = `FROM (${filteredMessagesSQ}) AS m1 LEFT JOIN metadata m2 ON m1.id = m2.message_id`;
  const GROUP_BY = `GROUP BY m1.id, m1.created_at, m1.sender, m1.recipient, m1.text, m1.type`;

  const query = `${SELECT} ${FROM} ${GROUP_BY} ORDER BY created_at ASC`;

  const { rows } = await getClient().query(query, [userId, recipient, start, limit]);

  return rows;
}

module.exports = {
  createMessage,
  createMetadata,
  getMessages,
};
