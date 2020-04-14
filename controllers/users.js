const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

//sign-up endpoint to create user
const signUp = (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 8;
  bcrypt.hash(password, saltRounds)
    .then((hashedPassword) => User.createUser(email, hashedPassword))
    .then(() => res.status(201).send('User account created.'))
    .then(() => console.log(`${user_id}`))
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
}

const getAllUsers = (req, res) => {
  User.getAllUsers()
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
}

module.exports = {
  signUp,
  getAllUsers,
};
