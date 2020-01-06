exports.up = function(knex) {
  return knex.schema
    .createTable("user", tbl => {
      tbl.increments();

      tbl.string("password", 128).notNullable();
      tbl.string("username", 128).notNullable();
      tbl.string("first_name", 128);
      tbl.string("last_name", 128);
      tbl
        .string("email", 128)
        .unique();
    })
    .createTable("item", tbl => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.string("description", 128).notNullable();
      tbl.float("price").notNullable();
      tbl.string("city", 128).notNullable();
      tbl.string("country", 128).notNullable();

      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("category", tbl => {
      tbl.increments();

      tbl.string("type", 128).notNullable();

      tbl
        .integer("item_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("item")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("user_item", tbl => {
      tbl
        .integer("item_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("item")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl.primary(["user_id", "item_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("user")
    .dropTableIfExists("item")
    .dropTableIfExists("category")
    .dropTableIfExists("user_item");
};
