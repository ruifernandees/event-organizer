import request from 'supertest';

import app from '../../src/app';

describe('File upload', () => {
  it('should return status 200 when upload a text/plain file', async () => {
    const response = await request(app)
      .post('/event')
      .attach('file', '__test__/attach/proposals.txt');

    expect(response.status).toBe(200);
  });

  it('should return status 500 when upload a non text/plain file', async () => {
    const response = await request(app)
      .post('/event')
      .attach('file', '__test__/attach/image.png');

      expect(response.status).toBe(500);
  });
});