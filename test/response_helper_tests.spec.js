const pry = require('pryjs')
const chai = require('chai')
const should = chai.should()
const res = require('./test_helpers/response_mock')
const ResponseHelper = require('../helpers/response_helper')
const Foods = require('../models/foods')

describe('Helper Tests', () => {

  it('with valid promise', () => {
    let response_helper = new ResponseHelper()
    return response_helper.execute(Foods.getAll, res)
      .then(result => {
        result.stat.should.equal(200)
        result.body.should.be.a('array')
        result.body[0].should.be.a('object')
      })
  })

  it('with arguements', (done) => {

  })

  xit('with invalid promise', (done) => {

  })

  xit('with erroring promise', (done) => {

  })
})
