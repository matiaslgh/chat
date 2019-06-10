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

module.exports = {
  createMessage,
  createMetadata,
};
