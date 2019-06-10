const request = require('supertest');
const { mocksForIntegration, cleanQuery } = require('../testUtils');

const src = '../../src';
const INSERT_QUERY =
  'INSERT INTO messages (sender, recipient, type, text, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, created_at AS timestamp';
let token;
let query;
beforeAll(done => {
  const { dbQuery, validPassword } = mocksForIntegration();
  query = dbQuery;

  const app = require(`${src}/app`);

  request(app)
    .post('/login')
    .send({
      username: 'whatever',
      password: validPassword,
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    });
});

describe('Messages endpoint', () => {
  afterEach(() => {
    query.mockClear();
  });

  it('Saves a text message and responds 200 with {id, timestamp}', done => {
    const app = require(`${src}/app`);

    const dbResponse = {
      rows: [
        {
          id: 123,
          timestamp: 'timestamp',
        },
      ],
    };
    query.mockReturnValue(dbResponse);

    const data = {
      sender: 1,
      recipient: 2,
      content: {
        type: 'text',
        text: 'Hello',
      },
    };

    return request(app)
      .post('/messages')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(dbResponse.rows[0]);

        const params = query.mock.calls[0];
        expect(cleanQuery(params[0])).toEqual(INSERT_QUERY);
        expect(params[1]).toEqual([
          data.sender,
          data.recipient,
          data.content.type,
          data.content.text,
        ]);
        done();
      });
  });

  it('Saves an image message and responds 200 with {id, timestamp}', done => {
    const app = require(`${src}/app`);

    const dbResponse = {
      rows: [
        {
          id: 123,
          timestamp: 'timestamp',
        },
      ],
    };
    query.mockReturnValue(dbResponse);

    const data = {
      sender: 1,
      recipient: 2,
      content: {
        type: 'image',
        url: 'I am an url',
        height: 400,
        width: 400,
      },
    };

    return request(app)
      .post('/messages')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(dbResponse.rows[0]);

        const params1 = query.mock.calls[0];
        expect(cleanQuery(params1[0])).toEqual(INSERT_QUERY);
        expect(params1[1]).toEqual([data.sender, data.recipient, data.content.type, null]);

        const params2 = query.mock.calls[1];
        expect(cleanQuery(params2[0])).toEqual(
          'INSERT INTO metadata (message_id, name, value) VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9)'
        );
        expect(params2[1]).toEqual([
          res.body.id,
          'url',
          data.content.url,
          res.body.id,
          'height',
          data.content.height,
          res.body.id,
          'width',
          data.content.width,
        ]);
        done();
      });
  });

  // TODO: this test
  // it('Saves a video message and responds 200 with {id, timestamp}', done => {});

  // TODO: this test
  // it('Responds with 401 if the sender field is not the logged user', done => {});

  // TODO: test getMessages with a normal conversation with images/videos/text
  // TODO: test send wrong data to getMessages
});
