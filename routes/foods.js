const pry = require('pryjs')
const express = require('express');
const router = express.Router();
const Foods = require('../models/foods')
const build_response = require('../helpers/response_helper').build_response

router.get('/', function(req, res, next) {
  return Foods.getAll()
    .then(result => {
      build_response(result, res)
    })
    .catch(error => {
      return res.status(404)
    })
})

router.post('/', function(req, res, next) {
  let name = req.body.food.name;
  let calories = req.body.food.calories;

  return Foods.post(name, calories)
      .then(created => {
        build_response(created, res, {err_code: 400})
      })
      //.catch(error => { return error })
})

router.get('/:id', function(req, res, next) {
  return Foods.get(req.params.id)
    .functhing
    .then(result => {
      build_response(result, res)[0]
    })
    .catch(error => { return error })
})

router.patch('/:id', function(req, res, next) {
  let id = req.params.id;
  let name = req.body.food.name;
  let calories = req.body.food.calories;

  return Foods.update(id, name, calories)
    .then(changed => {
      return build_response(changed, res, {err_code: 400})
    })
    //.catch(error => { return error })
})

router.delete('/:id', function(req, res, next) {
  return Foods.destroy(req.params.id)
    .then(deleted => {
      return build_response(deleted, res)
    })
    //.catch(error => { return error })
});

module.exports = router;
