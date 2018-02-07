const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const getAll = () => {
  return database.select().from('foods')
}

const get = (id) => {
  return database.select().from('foods').where('id', id)
}

const post = (name, calories) => {
  return database('foods').returning('*').insert({name: name, calories: calories, created_at: new Date})
}

const update = (id, name, calories) => {
  if (name || calories) {
    return database('foods').returning('*').where('id', id).update({name: name, calories: calories})
  } else {
    return false
  }
}

const destroy = (id) => {
  return database('foods').returning('*').where('id', id).del()
}

module.exports = { getAll, get, post, update, destroy }
