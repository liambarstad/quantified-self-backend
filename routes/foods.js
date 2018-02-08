const express = require('express');
const router = express.Router();
const Foods = require('../models/foods')
const build_response = require('../helpers/response_helper').build_response

router.get('/', function(req, res, next) {
  Foods.getAll()
    .then(result => {
      res.status(200).json(result)
      //return build_response(result, res)
    })
    .catch(error => { return error })
})

router.post('/', function(req, res, next) {
  let name = req.body.food.name;
  let calories = req.body.food.calories;

  Foods.post(name, calories)
      .then(created => {
        return build_response(created, res, {err_code: 400})
      })
      .catch(error => { return error })
})

router.get('/:id', function(req, res, next) {
  Foods.get(req.params.id)
    .then(result => {
      return build_response(result, res)[0]
    })
    .catch(error => { return error })
})

router.patch('/:id', function(req, res, next) {
  let id = req.params.id;
  let name = req.body.food.name;
  let calories = req.body.food.calories;

  Foods.update(id, name, calories)
    .then(changed => {
      return build_response(changed, res, {err_code: 400})
    })
    .catch(error => { return error })
})

router.delete('/:id', function(req, res, next) {
  Foods.destroy(req.params.id)
    .then(deleted => {
      return build_response(deleted, res)
    })
    .catch(error => { return error })
});

module.exports = router;
