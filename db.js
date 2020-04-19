const { Pool } = require('pg');

<<<<<<< HEAD
const pool = new Pool ({
  user: 'laishacalalpa',
  host: 'localhost',
  database: 'app',
  password: null,
  port: 5432,
});

module.exports = {
  query: (queryText, params) => pool.query(queryText, params),
=======
const { Pool } = require('pg');
const localConnect = 'postgresql://postgres@localhost:5432/our_story';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || localConnect,
});


module.exports = {
  query: (text, params) => pool.query(text, params),
>>>>>>> 44d06cddd192d699645cbf1f52cd838f7332ab62
};
