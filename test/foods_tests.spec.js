const pry = require('pryjs')
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const app = require('../app')
const configuration = require('../knexfile').test
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('Foods API Routes', () => {
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

  describe('Get All Foods', () => {
    it('with correct path', () => {
      return chai.request(app)
        .get('/api/v1/foods')
        .then(response => {
          response.should.have.status(200)
          response.body.should.be.a('array')
          response.body.length.should.equal(3)
          response.body[0].should.have.property('id')
          response.body[0].should.have.property('name')
          response.body[0].should.have.property('calories')
        })
    })

    it('with incorrect path', () => {
      return chai.request(app)
        .get('/sad_sad_path')
        .catch(response => {
          response.should.have.status(404)
        })
    })
  })

  describe('Get a Single Food', () => {
    it('with valid ID', () => {
      return chai.request(app)
        .get('/api/v1/foods/1')
        .then((response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('id')
          response.body.should.have.property('name')
          response.body.should.have.property('calories')
          response.body.id.should.equal(1)
        })
    })
   
    it('with invalid ID', () => {
      return chai.request(app)
        .get('/api/v1/foods/435')
        .catch(response => {
          response.should.have.status(404)
        })
    })
  })

  describe('Create New Food', () => {
    it('with name and calories', () => {
      return chai.request(app)
        .post('/api/v1/foods')
        .send({ food: { name: 'Walrus', calories: 3000 } })
        .then(response => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('id')
          response.body.should.have.property('name')
          response.body.should.have.property('calories')
          response.body.name.should.equal('Walrus')
          response.body.calories.should.equal(3000)
        })
    })

    it('with name', () => {
      return chai.request(app)
        .post('/api/v1/foods')
        .send({ food: { name: 'namedWalrus' } })
        .catch(response => {
          response.should.have.status(400)
        })
    })

    it('with calories', () => {
      return chai.request(app)
        .post('/api/v1/foods')
        .send({ food: { calories: 400 } })
        .catch(response => {
          response.should.have.status(400)
        })
    })

    it('with wrong info', () => {
      return chai.request(app)
        .post('/api/v1/foods')
        .send({ thistle: true, walrus: 'definitely not' })
        .catch(response => {
          response.should.have.status(400)
        })
    })

    it('with no info', () => {
      return chai.request(app)
        .post('/api/v1/foods')
        .catch(response => {
          response.should.have.status(400)
        })
    })
  })

  describe('Update Food', () => {
    it('with name and calories', () => {
      return chai.request(app)
        .patch('/api/v1/foods/1')
        .send({ food: { name: 'newName', calories: 600 } })
        .then(response => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.id.should.equal(1)
          response.body.name.should.equal('newName')
          response.body.calories.should.equal(600)
        })
    })

    it('with name', () => {
      return chai.request(app)
        .patch('/api/v1/foods/1')
        .send({ food: { name: 'newerName' } })
        .then(response => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.id.should.equal(1)
          response.body.name.should.equal('newerName')
          response.body.calories.should.equal(800)
        })
    })

    it('with calories', () => {
      return chai.request(app)
        .patch('/api/v1/foods/1')
        .send({ food: { calories: 550 } })
        .then(response => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.id.should.equal(1)
          response.body.name.should.equal('Chicken Burrito')
          response.body.calories.should.equal(550)
        })
    })

    it('with wrong info', () => {
      return chai.request(app)
        .patch('/api/v1/foods/1')
        .send({ name: 'Taquito', calories: 1200 })
        .catch(response => {
          response.should.have.status(400)
        })
    })

    it('with no info', () => {
      return chai.request(app)
        .patch('/api/v1/foods/1')
        .catch(response => {
          response.should.have.status(400)
        })
    })
  })

  describe('Delete Food', () => {
    it('with valid ID', () => {
      return chai.request(app)
        .delete('/api/v1/foods/1')
        .then(response => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('id')
          response.body.should.have.property('name')
          response.body.should.have.property('calories')
          response.body.id.should.equal(1)
        })
    })

    it('with invalid ID', () => {
      return chai.request(app)
        .delete('/api/v1/foods/4242')
        .catch(response => {
          response.should.have.status(404)
        })
    })
  })
})
