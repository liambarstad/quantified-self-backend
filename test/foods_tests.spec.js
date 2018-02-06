const pry = require('pryjs')
const chai = require('chai')
const should = chai.should
const chaiHttp = require('chai-http')
const app = require('../app')
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('Foods API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error
      })
  })

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error
      })
  })

  describe('Get All Foods', () => {
    it('with correct path', () => {
      return chai.request(app)
        .get('/api/v1/foods')
        .then((response) => {
          console.log(response)
          response.should.have.status(200)
          response.body.should.be.a('array')
          response.body.length.should.equal(10)
          response.body[0].should.have.property('id')
          response.body[0].should.have.property('name')
          response.body[0].should.have.property('calories')
          response.body[0].name.should.equal('Chicken Burrito')
          response.body[0].calories.should.equal(800)
        })
    })

    it('with incorrect path', () => {
      return chai.request(app)
        .get('/sad_sad_path')
        .then(response => {
          response.should.have.status(404)
        })
    })
  })
})
