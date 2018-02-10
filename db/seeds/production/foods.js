exports.seed = (knex, Promise) => {
  return knex('foods').truncate()
    .then(() => {
      return knex('foods').insert([
        {name: 'Chicken Burrito', calories: 800, created_at: new Date},
        {name: 'Grapes', calories: 180, created_at: new Date},
        {name: 'Blueberry Muffin', calories: 450, created_at: new Date},
        {name: 'Yogurt', calories: 550, created_at: new Date},
        {name: 'Macaroni and Cheese', calories: 950, created_at: new Date},
        {name: 'Granola Bar', calories: 200, created_at: new Date},
        {name: 'Gum', calories: 50, created_at: new Date},
        {name: 'Cheese', calories: 400, created_at: new Date},
        {name: 'Banana', calories: 150, created_at: new Date},
        {name: 'Fruit Snack', calories: 120, created_at: new Date},
        {name: 'Watermelon', calories: 20, created_at: new Date},
        {name: 'Apple', calories: 50, created_at: new Date},
        {name: 'Bagel Bites', calories: 300, created_at: new Date}
      ]);
    });
};
