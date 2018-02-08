const chai = require('chai')
const should = chai.should()
const ResponseHelper = require('../helpers/response_helper')
const build_response = ResponseHelper.build_response
const Foods = require('../models/foods')

describe('Helper Tests', () => {

  it('with valid promise', () => {
    let res = {
      status: (stat) => {
        this.stat = stat
      },
      json: (stuff) => {
        this.body = stuff.json()
      }
    }

    return Foods.getAll().buildresponse(res)
      .then(response => {
        response.stat.should.equal(200)
        response.body.should.be.a('array')
        response.body[0].should.be.a('object')
      })
  })

  it('with invalid promise', () => {

  })

  it('with erroring promise', () => {

  })
})
