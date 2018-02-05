var addFood = function(knex, name, calories) {
  return knex.raw(
      `INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, [name, calories, new Date]
      )
}

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
    .then(function () {
      return Promise.all([
        addFood(knex, 'Chicken Burrito', 800),
        addFood(knex, 'Grapes', 180),
        addFood(knex, 'Blueberry Muffins', 450),
        addFood(knex, 'Yogurt', 550),
        addFood(knex, 'Macaroni and Cheese', 950),
        addFood(knex, 'Granola Bar', 200),
        addFood(knex, 'Gum', 50),
        addFood(knex, 'Cheese', 400),
        addFood(knex, 'Banana', 150),
        addFood(knex, 'Fruit Snack', 120),
        addFood(knex, 'Watermelon', 20),
        addFood(knex, 'Apple', 50),
        addFood(knex, 'Bagel Bites', 300)
      ]);
    });
};
