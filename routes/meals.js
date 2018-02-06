var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

router.get('/api/v1/meals', (request, response) => {

})


module.exports = router;
//Select meals.id, meals.name From (SELECT foods.id, foods.name, foods.calories) AS foods From meals Left Outer Join meal_foods ON meal_foods.meal = meals.id Left Outer Join foods On food.id = meal_foods.food Group By meals.id; 
