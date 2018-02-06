var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

router.get('/', function(req, res, next) {
  database.raw('SELECT * FROM foods')
    .then(function(result) {
      return res.status(200).json(result['rows']);
    });
});

router.get('/:id', function(req, res, next) {
  let id = req.params.id
  database.raw('SELECT * FROM foods WHERE id=?', id)
    .then(function(result) {
      let food = result['rows'][0]
      if (food) {
        return res.status(200).json(food);
      } else {
        return res.status(404);
      }
    });
});

router.post('/', function(req, res, next) {
  let name = req.body['food']['name'];
  let calories = req.body['food']['calories'];
  if (name && calories) {
    database.raw('INSERT INTO foods (name, calories, created_at) VALUES(?, ?, ?) RETURNING *', [name, calories, new Date])
      .then(function(created) {
        if (created) {
          return res.status(200).json(created);
        } else {
          return res.status(400);
        }
      });
  };
});
module.exports = router;
