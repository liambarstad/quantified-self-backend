const express = require('express');
const router = express.Router();
const Foods = require('../models/foods')
const ResponseHelper = require('../helpers/response_helper')

router.get('/', function(req, res, next) {
  let response = new ResponseHelper()
  return response.execute(Foods.getAll, res)
})

router.post('/', function(req, res, next) {
  let params = []
  if (req.body.food) {
    params.push(req.body.food.name, req.body.food.calories)
  }
  let response = new ResponseHelper({error_code: 400})
  return response.execute(Foods.post, res, params)
})

router.get('/:id', function(req, res, next) {
  let response = new ResponseHelper()
  return response.execute(Foods.get, res, [req.params.id])
})

router.patch('/:id', function(req, res, next) {
  let params = []
  if (req.body.food) {
    params.push(req.params.id, req.body.food.name, req.body.food.calories)
  }
  let response = new ResponseHelper({error_code: 400})
  return response.execute(Foods.update, res, params)
})

router.delete('/:id', function(req, res, next) {
  let response = new ResponseHelper()
  return response.execute(Foods.destroy, res, [req.params.id])
})

module.exports = router;
