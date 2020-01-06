
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        { type: "vegetable produce", item_id: 1 },
        { type: "fruit produce", item_id: 2 },
        { type: "fruit produce", item_id: 3 },
        { type: "vegetable produce", item_id: 4 },

        { type: "vegetable produce", item_id: 5 },
        { type: "fruit produce", item_id: 6 },
        { type: "vegetable produce", item_id: 7 },
        { type: "animal produce", item_id: 8 },

        { type: "vegetable produce", item_id: 9 },
        { type: "fruit produce", item_id: 10 },
        { type: "vegetable produce", item_id: 11 },
        { type: "fruit produce", item_id: 12 },
        { type: "vegetable produce", item_id: 13 },
        { type: "vegetable produce", item_id: 14 },

      ]);
    });
};
