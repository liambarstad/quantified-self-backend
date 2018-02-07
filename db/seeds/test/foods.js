exports.seed = (knex, Promise) => {
  return knex('foods').truncate()
    .then(() => {
      return knex('foods').insert([
        {name: 'Chicken Burrito', calories: 800, created_at: new Date},
        {name: 'Grapes', calories: 180, created_at: new Date},
        {name: 'Blueberry Muffin', calories: 450, created_at: new Date},
      ]);
    });
};
