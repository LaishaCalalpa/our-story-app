const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// sign-up endpoint to create user
const signUp = (req, res) => {
  const { email, password } = req.body;
  
  const saltRounds = 8;
  
  bcrypt.hash(password, saltRounds)
    .then((hashedPassword) => User.createUser(email, hashedPassword))
    .then(() => res.status(201).redirect('/'))
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

const getAllUsers = (req, res) => {
  User.getAllUsers()
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.getByEmail(email);

    if (!user) {
      res.status(404).send('No user with that email');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(404).send('Wrong password, try again');
    }

    const payload = {
      id: user.user_id,
    };

    const privateKey = 'secret';

    jwt.sign(payload, privateKey, (err, hashedPayload) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      console.log('JWT: ', hashedPayload);
      res.cookie('userToken', hashedPayload).redirect('/feed'); //refactor to feed
    });
  } catch (err) {
    console.log(err);
    return res.send(res);
  }
};

const verify = async (req, res, next) => {
  if (!req.cookies.userToken) {
    res.status(401).send('Unathorized user');
  }

  const user = jwt.verify(req.cookies.userToken, 'secret');

  const { id } = user;

  try {
    const searchedUser = await User.getById(id);

    if (!searchedUser) {
      return res.status(401).send('Unathorized user');
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const getUserById = (req, res) => {
  const { userToken } = req.cookies;
  const payload = jwt.decode(userToken);
  const { id } = payload;
  
  console.log(id);
  
  User.getById(id)
    .then((data)=> res.json(data.rows[0]))
    .catch((err) => res.send(err));
};

const updateBio = (req, res) => {
  const { userToken } = req.cookies;
  const payload = jwt.decode(userToken);
  const { id } = payload;
  const { bio } = req.body;

  User.updateBio(id, bio);
};

const logout = (req, res) => {
  res.clearCookie('userToken').redirect('/');
};

module.exports = {
  login,
  signUp,
  getAllUsers,
  verify,
  updateBio,
  logout,
  getUserById,
};