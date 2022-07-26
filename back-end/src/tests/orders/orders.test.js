const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { Sale, User } = require('../../database/models');
const app = require('../../api/app');
const { validUser, validSeller } = require('../users/mocks/loginMocks');
const {
  orders,
  userOrderById,
  sellerOrderById,
  userIdConflictOrder,
} = require('./mocks/ordersMock');
const { userDbResponse, sellerDbResponse } = require('../users/mocks/loginMocks');

chai.use(chaiHttp);
const { expect } = chai;

describe('Test GET /customer/orders endpoint', () => {
  let res;
  let token;

  describe('with user token', () => {
    beforeEach(async () => {
      const { body } = await chai.request(app).post('/login')
        .send(validUser);
      token = body.token;
  
      sinon.stub(User, 'findOne').resolves(userDbResponse);
    });
  
    afterEach(() => {
      User.findOne.restore();
    });
  
    describe('List all orders from an user', () => {
      before(async () => {
        sinon.stub(Sale, 'findAll').resolves(orders);
      });
      after(() => {
        (Sale.findAll).restore();
      });
  
      it('Should http status 200 and an array', async () => {
        res = await chai.request(app)
          .get('/customer/orders').set({ authorization: token });
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array').to.have.length(3);
        expect(res.body[0]).to.include.all.keys([
          'id',
          'totalPrice',
          'deliveryAddress',
          'deliveryNumber',
          'saleDate',
          'status',
          'userId',
          'sellerId',
        ]);
      });
    });
  
    describe('List a specific order using the id param', () => {
      before(async () => {
        sinon.stub(Sale, 'findOne').resolves(userOrderById);
      });
  
      after(() => {
        (Sale.findOne).restore();
      });
  
      it('Should return hhtp status 200 and an object', async () => {
        res = await chai.request(app).get('/customer/orders/1')
          .set({ authorization: token });
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object').to.have.own.property('status');
      });
    });
  });

  describe('Test role conflict case', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(sellerDbResponse);
      sinon.stub(Sale, 'findOne').resolves(userIdConflictOrder);
    });

    after(() => {
      (User.findOne).restore();
      (Sale.findOne).restore();
    });

    it('Should return http status 403', async () => {
      const { body } = await chai.request(app).post('/login')
        .send(validSeller);
      token = body.token;

      res = await chai.request(app).get('/customer/orders/1').set({ authorization: token });
      expect(res.status).to.be.equal(403);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Access denied');
    });
  });
});

describe('Test GET /seller/orders endpoint', () => {
  let res;
  let token;

  describe('with seller token', () => {
    beforeEach(async () => {
      const { body } = await chai.request(app).post('/login')
        .send(validSeller);
      token = body.token;
      sinon.stub(User, 'findOne').resolves(sellerDbResponse);
    });

    afterEach(() => {
      User.findOne.restore();
    });
  
    describe('List all orders from a seller', () => {
      before(async () => {
        sinon.stub(Sale, 'findAll').resolves(orders);
      });
  
      after(() => {
        (Sale.findAll).restore();
      });
  
      it('Should return http status 200 and an array', async () => {
        res = await chai.request(app).get('/seller/orders')
          .set({ authorization: token });
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array').to.have.length(3);
        expect(res.body[0]).to.all.keys([
          'id',
          'totalPrice',
          'deliveryAddress',
          'deliveryNumber',
          'saleDate',
          'status',
          'userId',
          'sellerId',
        ]);
      });
    });
  
    describe('List a specific order using the id param', () => {
      before(async () => {
        sinon.stub(Sale, 'findOne').resolves(sellerOrderById);
      });
      after(() => {
        (Sale.findOne).restore();
      });
  
      it('Should return http status 200 and an object', async () => {
        res = await chai.request(app).get('/seller/orders/2')
          .set({ authorization: token });
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object').to.have.own.property('status');
      });
    });
  });

  describe('with customer token', () => {
    beforeEach(async () => {
      const { body } = await chai.request(app).post('/login')
        .send(validUser);
      token = body.token;
      sinon.stub(User, 'findOne').resolves(userDbResponse);
    });

    afterEach(() => {
      User.findOne.restore();
    });

    describe('try to list all seller orders', () => {
      it('Should return http status 403', async () => {
        res = await chai.request(app).get('/seller/orders').set({ authorization: token });
        expect(res.status).to.be.equal(403);
        expect(res.body).to.be.an('object').to.have.own.property('message');
        expect(res.body.message).to.be.equal('Access denied');
      });
    });
  
    describe('try to list a specifc seller order', () => {
      it('Should return http status 403', async () => {
        res = await chai.request(app).get('/seller/orders/2').set({ authorization: token });
        expect(res.status).to.be.equal(403);
        expect(res.body).to.be.an('object').to.have.own.property('message');
        expect(res.body.message).to.be.equal('Access denied');
      });
    });
  });
});

describe('Test PATCH seller/orders/start/:id', () => {
  let res;

  describe('with invalid token', () => {
    it('expect status 401 and message \'Invalid token\'', async () => {
      res = await chai.request(app).patch('/seller/orders/start/2');
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Invalid token');
    });
  });

  describe('with valid token', () => {
    let token;

    beforeEach(async () => {
      const { body } = await chai.request(app).post('/login')
        .send(validSeller);
      token = body.token;
    });

    describe('Update status sale property at start route', () => {
      before(async () => { sinon.stub(Sale, 'update').resolves(1); });
      after(() => { (Sale.update).restore() });
  
      it('Should return http status 204', async () => {
        res = await chai.request(app).patch('/seller/orders/start/2')
          .set({ authorization: token });
        expect(res.status).to.be.equal(204);
      });
    });
  
    describe('Does not update status sale property at start route', () => {
      before(async () => { sinon.stub(Sale, 'update').resolves(0); });
      after(() => { (Sale.update).restore() });
  
      it('Should return http status 404', async () => {
        res = await chai.request(app).patch('/seller/orders/start/2')
          .set({ authorization: token });
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.an('object').to.have.own.property('message');
        expect(res.body.message).to.be.equal('Order not found');
      });
    });
  
    describe('Test database exception at start route', () => {
      before(async () => {
        sinon.stub(Sale, 'update').throws();
      });
  
      after(() => { (Sale.update).restore(); });
  
      it('Should return http status 500', async () => {
        res = await chai.request(app).patch('/seller/orders/start/2')
          .set({ authorization: token });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.have.own.property('message')
      });
    });
  });
});

describe('Test PATCH seller/orders/leave/:id', () => {
  let res;
  let token;

  beforeEach(async () => {
    const { body } = await chai.request(app).post('/login')
      .send(validSeller);
    token = body.token;
  });

  describe('Update status sale property at /seller/orders/leave/:id route', () => {
    before(async () => { sinon.stub(Sale, 'update').resolves(1); });
    after(() => { (Sale.update).restore() });
  
    it('Should return http status 204', async () => {
      res = await chai.request(app).patch('/seller/orders/leave/2')
        .set({ authorization: token });
      expect(res.status).to.be.equal(204);
    });
  });
  
  describe('Does not update status sale property at leave route', () => {
    before(async () => { sinon.stub(Sale, 'update').resolves(0); });
    after(() => { (Sale.update).restore() });
  
    it('Should return http status 404', async () => {
      res = await chai.request(app).patch('/seller/orders/leave/2')
        .set({ authorization: token });
      expect(res.status).to.be.equal(404);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Order not found');
    });
  });
  
  describe('Test database exception at leave route', () => {
    before(async () => {
      sinon.stub(Sale, 'update').throws();
    });
  
    after(() => { (Sale.update).restore(); });
  
    it('Should return http status 500', async () => {
      res = await chai.request(app).patch('/seller/orders/leave/2')
        .set({ authorization: token });
      expect(res.status).to.be.equal(500);
      expect(res.body).to.have.own.property('message')
    });
  });
});

describe('Test PATCH seller/orders/leave/:id', () => {
  let res;
  let token;

  beforeEach(async () => {
    const { body } = await chai.request(app).post('/login')
      .send(validSeller);
    token = body.token;
  });

  describe('Update status sale property at /seller/orders/delivered/:id route', () => {
    before(async () => { sinon.stub(Sale, 'update').resolves(1); });
    after(() => { (Sale.update).restore() });

    it('Should return http status 204', async () => {
      res = await chai.request(app).patch('/seller/orders/delivered/2')
        .set({ authorization: token });
      expect(res.status).to.be.equal(204);
    });
  });

  describe('Does not update status sale property at delivered route', () => {
    before(async () => { sinon.stub(Sale, 'update').resolves(0); });
    after(() => { (Sale.update).restore() });

    it('Should return http status 404', async () => {
      res = await chai.request(app).patch('/seller/orders/delivered/2')
        .set({ authorization: token });
      expect(res.status).to.be.equal(404);
      expect(res.body).to.be.an('object').to.have.own.property('message');
      expect(res.body.message).to.be.equal('Order not found');
    });
  });

  describe('Test database exception at delivered route', () => {
    before(async () => {
      sinon.stub(Sale, 'update').throws();
    });

    after(() => { (Sale.update).restore(); });

    it('Should return http status 500', async () => {
      res = await chai.request(app).patch('/seller/orders/delivered/2')
        .set({ authorization: token });
      expect(res.status).to.be.equal(500);
      expect(res.body).to.have.own.property('message')
    });
  });
});
