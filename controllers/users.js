const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
      id: user.id,
    };

    const privateKey = 'secret';

    jwt.sig(payload, privateKey, (err, hashedPayload) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      console.log('JWT: ', hashedPayload);
      res.cookie('userToken', hashedPayload).send('Logged In');
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

const logout = (req, res) => {
  res.clearCookie('userToken');
};

const updateBio = (req, res) => {
  const { userToken } = req.cookies;
  const payload = jwt.decode(userToken);
  const { id } = payload;
  const { bio } = req.body;

  User.updateBio(id, bio)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  login,
  verify,
  updateBio,
  logout,
};
