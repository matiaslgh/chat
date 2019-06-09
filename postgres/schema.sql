CREATE TABLE users(
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  password CHAR(60) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  last_connection TIMESTAMP NOT NULL
);

CREATE TABLE test(
  id BIGSERIAL PRIMARY KEY
);