CREATE TABLE users(
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  password CHAR(60) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  last_connection TIMESTAMP NOT NULL
);

CREATE TYPE message_type AS ENUM ('text', 'image', 'video');

CREATE TABLE messages(
  id BIGSERIAL PRIMARY KEY,
  sender BIGINT NOT NULL REFERENCES users(id),
  recipient BIGINT NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL,
  type message_type NOT NULL,
  text TEXT
);

CREATE TABLE metadata(
  id BIGSERIAL PRIMARY KEY,
  message_id BIGINT NOT NULL REFERENCES messages(id),
  name VARCHAR(50) NOT NULL,
  value VARCHAR(100) NOT NULL
);