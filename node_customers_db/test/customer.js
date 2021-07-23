const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../index');
const query = require('../db/customers');
const should = chai.should();

chai.use(chaihttp);

const testCustomer =  {
        firstname: "Peter",
        lastname: "North",
        email: "peter@north.com",
        phone: "901176"
}

describe('/POST customer', () => {
    beforeEach((done) => {
        query.deleteAllCustomers();
        done();
    });

    it('Add new customer', (done) => {
        chai.request(app)
            .post('/api/customers')
            .set('Content-type', 'application/json')
            .send(JSON.stringify(testCustomer))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('firstname');
                done();
            });
    });
});

describe('GET customers', () => {
    it('Fetch all customers', (done) => {
        chai.request(app)
            .get('/api/customers')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });
});