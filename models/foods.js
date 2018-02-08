const pry = ('pryjs')
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const getAll = () => {
  return database.select().from('foods')
}

const get = (id) => {
  return database.select().returning('*').from('foods').where('id', id)
    .then(result => result[0])
}

const post = (name, calories) => {
  return database('foods').returning('*').insert({name: name, calories: calories, created_at: new Date})
    .then(result => result[0])
}

const update = (id, name, calories) => {
  if (name || calories) {
    return database('foods').returning('*').where('id', id).update({name: name, calories: calories})
      .then(result => result[0])
  } else {
    return false
  }
}

const destroy = (id) => {
  return database('foods').returning('*').where('id', id).del()
}

module.exports = { getAll, get, post, update, destroy }
