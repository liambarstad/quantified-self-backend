exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meal_foods RESTART IDENTITY')
    .then(function () {
      return knex('meal_foods').insert([
        {meal: 1 ,food: 1,created_at: new Date},
        {meal: 2 ,food: 2,created_at: new Date},
        {meal: 3 ,food: 3,created_at: new Date},
        {meal: 4 ,food: 3,created_at: new Date}
      ])
    });
};
