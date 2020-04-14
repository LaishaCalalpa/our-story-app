const db = require('../db');

class User {
  static createUser(email, password) {
    const queryText = `INSERT INTO users (email, password) VALUES ($1, $2)`;
    return db.query(queryText, [email, password]);
  }

  static getAllUsers() {
    return db.query(`SELECT * FROM users;`);
  }

  static getByUsername(username) {
    const queryText = `SELECT * FROM users WHERE username = $1;`
    return db.query(queryText, [username])
      .then((data) => data.rows[0]);
    }

  static getAllUsers() {
    return  db.query(`SELECT * FROM users;`);
  }
  }


module.exports = User;
