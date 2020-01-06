
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('item').del()
    .then(function () {
      // Inserts seed entries
      return knex('item').insert([
        {name: 'corn' , description: 'red', price: 4.21, city: 'Zaria', country: 'Nigeria', user_id: 1},
        {name: 'cocoa bean' , description: 'coffee', price: 3.10, city: 'Zaria', country: 'Nigeria', user_id: 1},
        {name: 'banana' , description: 'green', price: 4.50, city: 'Zaria', country: 'Nigeria', user_id: 1},
        {name: 'cucumber' , description: 'regular', price: 3.50, city: 'Zaria', country: 'Nigeria', user_id: 1},

        {name: 'potato' , description: 'fresh', price: 6.50, city: 'Zaria', country: 'Nigeria', user_id: 2},
        {name: 'cocoa bean' , description: 'coffee', price: 3.50, city: 'Zaria', country: 'Nigeria', user_id: 2},
        {name: 'corn' , description: 'white', price: 4.11, city: 'Zaria', country: 'Nigeria', user_id: 2},
        {name: 'milk' , description: 'goat', price: 2.11, city: 'Zaria', country: 'Nigeria', user_id: 2},

        {name: 'eggplant' , description: '2 get 1 free', price: 3.10, city: 'Zaria', country: 'Nigeria', user_id: 3},
        {name: 'banana' , description: '3 bunches', price: 3.90, city: 'Zaria', country: 'Nigeria', user_id: 3},
        {name: 'cucumber' , description: 'baby cucumber', price: 4.05, city: 'Zaria', country: 'Nigeria', user_id: 3},
        {name: 'peanut' , description: 'salted', price: 3.50, city: 'Zaria', country: 'Nigeria', user_id: 3},
        {name: 'corn' , description: 'yellow', price: 2.50, city: 'Zaria', country: 'Nigeria', user_id: 3},
        {name: 'potato' , description: 'sliced', price: 3.30, city: 'Zaria', country: 'Nigeria', user_id: 3}

      ]);
    });
};
