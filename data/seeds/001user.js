const bcrypt = require("bcryptjs");


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { username: 'adaeze', password: `${bcrypt.hashSync("pass", 12)}`, email: 'adaeze@gmail.com', first_name: 'Adaeze', last_name: 'Abiodun' },
        { username: 'abidemi', password: `${bcrypt.hashSync("pass", 12)}`, email: 'abidemi@gmail.com', first_name: 'Abidemi', last_name: 'Achebe' },
        { username: 'abebi', password: `${bcrypt.hashSync("pass", 12)}`, email: 'abebi@gmail.com', first_name: 'Abedi', last_name: 'Abimbola' },

        { username: 'test', password: `${bcrypt.hashSync("pass", 12)}`, email: 'test@gmail.com', first_name: 'testfirst', last_name: 'testlast' }

      ]);
    });
};
