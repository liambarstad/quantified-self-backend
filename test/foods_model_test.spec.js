const chai = require('chai')
const should = chai.should()
const Foods = require('../models/foods')
//const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile').test
const database = require('knex')(configuration)

describe('Foods Model Tests', () => {
  before(done => {
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

  it('can get all foods', () => {
    Foods.getAll()
      .then(foods => {
        foods.should.be.a('array')
        foods.length.should.equal(3)
        foods[0].should.have.property('id')
        foods[0].should.have.property('name')
        foods[0].should.have.property('calories')
      })
  })

  it('can get a single food', () => {

  })

  it('can create a new food', () => {

  })

  it('can update a food', () => {

  })

  it('can delete a food', () => {

  })
})
