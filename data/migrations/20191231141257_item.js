exports.up = function(knex) {
  return knex.schema.createTable("item", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable();
    tbl.string("description", 128).notNullable();
    tbl.float("price").notNullable();
    tbl.string("city", 128).notNullable();
    tbl.string("country", 128).notNullable();

    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("user")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {};
