const pry = require('pryjs')
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
    Foods.get(1)
      .then(food => {
        food.should.be.a('object')
        food.should.have.property('id')
        food.should.have.property('name')
        food.should.have.property('calories')
      })
  })

  it('can create a new food', () => {
    Foods.post('newFood', 600)
      .then(food => {
        food.should.be.a('object')
        food.should.have.property('id')
        food.should.have.property('name')
        food.should.have.property('calories')
        food.id.should.be.a('number')
        food.name.should.equal('newFood')
        food.calories.should.equal(600)
        Foods.get(food.id)
          .then(food2 => {
            food2.should.have.property('name')
            food2.should.have.property('calories')
            food2.name.should.equal('newFood')
            food2.calories.should.equal(600)
          })
      })
  })

  it('can update a food', () => {
    Foods.update(1, 'newVersion', 700)
      .then(food => {
        food.should.be.a('object')
        food.should.have.property('id')
        food.should.have.property('name')
        food.should.have.property('calories')
        food.id.should.equal(1)
        food.name.should.equal('newVersion')
        food.calories.should.equal(700)
      })
  })

  it('can delete a food', () => {
    Foods.destroy(2)
      .then(food => {
        food.should.be.a('object')
        food.should.have.property('id')
        food.should.have.property('name')
        food.should.have.property('calories')
        food.id.should.equal(2)
      })
  })
})
