const pry = require('pryjs')
const chai = require('chai')
const should = chai.should()
const ResponseHelper = require('../helpers/response_helper')
const Foods = require('../models/foods')

describe('Helper Tests', () => {

  it('with valid promise', () => {
    class Res {
      constructor() {
        this.stat = 'you done goofed'
        this.body = 'done goofed up hard'
      }
      status(num) {
        this.stat = num
        return this
      }
      json(val) {
        this.body = val
        return this
      }
    }

    let response_helper = new ResponseHelper
    let res = new Res()
    return response_helper.execute(Foods.getAll, res)
      .then(result => {
        result.stat.should.equal(200)
        result.body.should.be.a('array')
        result.body[0].should.be.a('object')
      })
  })

  xit('with arguements', (done) => {

  })

  xit('with invalid promise', (done) => {

  })

  xit('with erroring promise', (done) => {

  })
})
