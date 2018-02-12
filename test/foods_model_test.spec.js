const chai = require('chai')
const should = chai.should()
const Foods = require('../models/foods')
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

  beforeEach(done => {
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

  it('can get a single food', (done) => {
    Foods.get(1)
      .then(food => {
        food.should.be.a('object')
        food.should.have.property('id')
        food.should.have.property('name')
        food.should.have.property('calories')
        done()
      })
  })

  it('can create a new food', (done) => {
    Foods.post('newFood', 600)
      .then(food => {
        food.should.be.a('object')
        food.should.have.property('id')
        food.should.have.property('name')
        food.should.have.property('calories')
        food.id.should.be.a('number')
        food.name.should.equal('newFood')
        food.calories.should.equal(600)
        done()
      })
  })

  it('can update a food', (done) => {
    Foods.update(1, 'newVersion', 700)
      .then(food => {
        food.should.be.a('object')
        food.should.have.property('id')
        food.should.have.property('name')
        food.should.have.property('calories')
        food.id.should.equal(1)
        food.name.should.equal('newVersion')
        food.calories.should.equal(700)
        done()
      })
  })

  it('can delete a food', (done) => {
    Foods.destroy(2)
      .then(food => {
        food.should.be.a('object')
        food.should.have.property('id')
        food.should.have.property('name')
        food.should.have.property('calories')
        food.id.should.equal(2)
        done()
      })
  })
})
