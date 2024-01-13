// index.js unit tests

const assert = require('assert');
// const sinon = require('sinon');
const request = require('supertest');
const app = require('../App.js');

describe('GET /', () => {
  it('should return the index page', () => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html');
  });
});

describe('GET /api/hello', () => {
  it('should return a JSON object with a greeting', () => {
    request(app)
      .get('/api/hello')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .expect({greeting: 'hello API'});
  });
});

describe('GET /api/:date', () => {
  it('should return a JSON object with the date in Unix and UTC formats', () => {
    const date = new Date();
    const unix = Date.parse(date);
    const utc = date.toUTCString();

    request(app)
      .get(`/api/${date}`)
      .expect(200)
      .expect('Content-Type', 'application/json')
      .expect({unix, utc});
  });

  it('should return an error if the date is invalid', () => {
    request(app)
      .get('/api/invalid-date')
      .expect(400)
      .expect('Content-Type', 'application/json')
      .expect({error: 'Invalid Date'});
  });
});

describe('GET /api', () => {
  it('should return a JSON object with the current date in Unix and UTC formats', () => {
    const date = new Date();
    const unix = Date.parse(date);
    const utc = date.toUTCString();

    request(app)
      .get('/api')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .expect({unix, utc});
  });
});