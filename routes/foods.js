const pry = require('pryjs')
const express = require('express');
const router = express.Router();
const Foods = require('../models/foods')
const ResponseHelper = require('../helpers/response_helper')

router.get('/', function(req, res, next) {
  return ResponseHelper().execute(Foods.getAll, res)
})

router.post('/', function(req, res, next) {
  let name = req.body.food.name;
  let calories = req.body.food.calories;
  let response = ResponseHelper({error_code: 400})
  return response.execute(Foods.post, res, [name, calories])
})

router.get('/:id', function(req, res, next) {
  return ResponseHelper().execute(Foods.get, res, [req.params.id])
})

router.patch('/:id', function(req, res, next) {
  let id = req.params.id;
  let name = req.body.food.name;
  let calories = req.body.food.calories;
  let response = ResponseHelper({error_code: 400})
  return response.execute(Foods.update, res, [id, name, calories])
})

router.delete('/:id', function(req, res, next) {
  return ResponseHelper().execute(Foods.destroy, res, [req.params.id])
})

module.exports = router;
