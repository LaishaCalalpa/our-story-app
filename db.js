const { Pool } = require('pg');

const pool = new Pool ({
  user: 'laishacalalpa',
  host: 'localhost',
  database: 'app',
  password: null,
  port: 5432,
});

module.exports = {
  query: (queryText, params) => pool.query(queryText, params),
};
