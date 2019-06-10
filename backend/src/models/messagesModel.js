const { getClient } = require('../connections/db-client');

async function createMessage(sender, recipient, type, text = null) {
  const { rows } = await getClient().query(
    ` INSERT INTO messages (sender, recipient, type, text, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id, created_at AS timestamp`,
    [sender, recipient, type, text]
  );
  const { id, timestamp } = rows[0];
  // TODO: throw custom error if sender/recipient doesn't exist
  return {
    id,
    timestamp,
  };
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

  await getClient().query(`INSERT INTO metadata (message_id, name, value) VALUES${params}`, values);
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

  const isNewerOrEqualThanMessage = messageId =>
    `created_at >= (SELECT created_at FROM messages WHERE id = ${messageId})`;

  const filterMessagesWhere = `
    WHERE ${isAMessageBetween('$1', '$2')} AND ${isNewerOrEqualThanMessage('$3')}
  `;

  const filteredMessagesSQ = `SELECT * FROM messages ${filterMessagesWhere} LIMIT $4`;

  const SELECT = `SELECT m1.id, m1.created_at AS timestamp, m1.sender, m1.recipient, ${createContent()}`;
  const FROM = `FROM (${filteredMessagesSQ}) AS m1 LEFT JOIN metadata m2 ON m1.id = m2.message_id`;
  const GROUP_BY = `GROUP BY m1.id, m1.created_at, m1.sender, m1.recipient, m1.text, m1.type`;

  const query = `${SELECT} ${FROM} ${GROUP_BY}`;

  // TODO: Add try/catch and throw custom errors
  // e.g. message type enum could be different
  const { rows } = await getClient().query(query, [userId, recipient, start, limit]);

  return rows;
}

module.exports = {
  createMessage,
  createMetadata,
  getMessages,
};
