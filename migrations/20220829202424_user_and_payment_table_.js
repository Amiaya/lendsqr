/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema
    .createTable("users", function (table) {
      table.increments();
      table.string("name");
      table.string("password");
      table.string("email").unique();
      table.string("pin")
      table.string("account_no");
      table.integer("balance").notNullable().defaultTo(0)
      table.timestamps(true, true);
  })
  .createTable("payments", function (table) {
      table.increments();
      table.integer("user_id");
      table.decimal("amount");
      table.string("description")
      table.decimal("balance")
      table.string("from");
      table.string("to");
  
      table.timestamps(true, true);
  });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
    .dropTable('users')
    .dropTable('payments')
  };
  