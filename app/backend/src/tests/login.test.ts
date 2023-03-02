import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/User';
import { Response } from 'superagent';
chai.use(chaiHttp);

const { expect } = chai;

describe('Tests /login', () => {
  describe('when the email is not informed', () => {
    it('should return a status 400 and the message "All fields must be filled"', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: '', password:  'secret_admin'});
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    });
  });
  describe('when the password is not informed', () => {
    it('should return a status 400 and the message "All fields must be filled"', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password:  ''});
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    });
  });
  describe('when access is not found', () => {
    it('should return a status 400 and the message "Invalid email or password"', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'notadmin@admin.com', password:  'not_secret_admin'});
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' })
    });
  });
  describe('when access is correct', () => {
    it('should return a status of 200 and a property called token', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password:  'secret_admin'});
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.have.property('token')
    });
  });
});