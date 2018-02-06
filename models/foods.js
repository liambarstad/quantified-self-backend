const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const getAll = () => {
  return database.returning()
}

const get = (id) => {
  return database.returning().where('id', id)
}

const post = (name, calories) => {
  return database.returning().insert({name: name, calories: calories, created_at: new Date})
}

const update = (id, name, calories) => {
  if (name || calories) {
    return database.returning().update({name: name, calories: calories}).where('id', id)
  } else {
    return false
  }
}

const destroy = (id) => {
  database.returning().where('id', id).del()
}

module.exports = { getAll, get, post, update, destroy }
