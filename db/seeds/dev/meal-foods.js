exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meal_foods RESTART IDENTITY')
    .then(function () {
      return knex('meal_foods').insert([
        {meal: 1 ,food: 1,created_at: new Date},
        {meal: 2 ,food: 2,created_at: new Date},
        {meal: 3 ,food: 3,created_at: new Date},
        {meal: 4 ,food: 4,created_at: new Date},
        {meal: 1 ,food: 5,created_at: new Date},
        {meal: 2 ,food: 6,created_at: new Date},
        {meal: 3 ,food: 7,created_at: new Date},
        {meal: 4 ,food: 8,created_at: new Date},
        {meal: 1 ,food: 9,created_at: new Date},
        {meal: 2 ,food: 10,created_at: new Date},
        {meal: 3 ,food: 11,created_at: new Date},
        {meal: 4 ,food: 12,created_at: new Date},
        {meal: 1 ,food: 13,created_at: new Date},
        {meal: 2 ,food: 1,created_at: new Date},
        {meal: 3 ,food: 2,created_at: new Date},
        {meal: 4 ,food: 3,created_at: new Date}
      ])
    });
};
