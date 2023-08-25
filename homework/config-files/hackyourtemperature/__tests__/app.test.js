import  Request  from 'supertest';
import app from '../app'

const request = require('supertest');

describe('POST /', () =>{
  it('quick test', () => {
    expect(1).toBe(1);
  })
})

describe('GET /', () => {
  it("Should send back a message 'Hello from backend to frontend!'", async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Hello from backend to frontend!');
  });

  it("Should send a status 200", (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});

describe('POST /weather', () => {
  it("Should send a status 200 in case of sending correct city name", (done) => {
    request(app)
      .post('/weather')
      .send({ cityName: "London" })
      .expect(200)
      .end(done);
  });

  it("Should send 'city name is missing' error in case of not sending a proper city name", (done) => {
    request(app)
      .post('/weather')
      .send({})
      .expect({ error: "city name is missing" })
      .end(done);
  });

  it("Should send a status 400 if the city was not found", (done) => {
    request(app)
      .post('/weather')
      .send({ cityName: "Londom" })
      .expect(400)
      .end(done);
  });

  it("Should send a message containing the temperature information if the city was found", (done) => {
    request(app)
      .post('/weather')
      .send({ cityName: "London" })
      .expect((res) => {
        expect(res.body.weatherText).toContain("The temperature in London is");
      })
      .end(done);
  });
});



