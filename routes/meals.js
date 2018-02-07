var express = require('express');
var router = express.Router();
const Meals = require('../models/meals')

router.get('/', (req, res) => {
  Meals.allMeals()
  .then((data) => {
    if (data.rowCount == 0) {
      return res.sendStatus(404)
    };
    data.rows.forEach((element) => {
        if (element.foods[0].id === null) {
          element.foods = [];
        }
    });
    res.json(data.rows)
  });
})

router.get('/:meal_id/foods', (req, res) => {
  const meal_id = req.params.meal_id
  Meals.mealsFoods(meal_id)
  .then((data) => {
    if (data.rowCount === 0) {
      return res.sendStatus(404)
    }
    res.status(201).json(data.rows);
  });
});


router.post('/:meal_id/foods/:id', (req, res) => {
  const meal_id = req.params.meal_id
  const food_id = req.params.id
  Meals.addFood(meal_id, food_id)
  .then((data)=>{
    if (data.rowCount === 0) {
      return res.sendStatus(404)
    }
    res.status(201).send("Successfully added food to meal")
  })
})

router.delete('/:meal_id/foods/:id', (req, res) => {
  const meal_id = req.params.meal_id
  const food_id = req.params.id
  Meals.deleteFood(meal_id, food_id)
  .then((data)=>{
    if (data.rowCount === 0) {
      return res.sendStatus(404)
    }
    res.status(201).send("Successfully Deleted Food From Meal")
  })
})


module.exports = router;
