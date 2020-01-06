
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_item').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_item').insert([
        { item_id: 1, user_id: 1 },
        { item_id: 2, user_id: 1 },
        { item_id: 3, user_id: 1 },
        { item_id: 4, user_id: 1 },
        { item_id: 5, user_id: 2 },
        { item_id: 6, user_id: 2 },
        { item_id: 7, user_id: 2 },
        { item_id: 8, user_id: 2 },
        { item_id: 9, user_id: 3 },
        { item_id: 10, user_id: 3 },
        { item_id: 11, user_id: 3 },
        { item_id: 12, user_id: 3 },
        { item_id: 13, user_id: 3 },
        { item_id: 14, user_id: 3 },


      ]);
    });
};
