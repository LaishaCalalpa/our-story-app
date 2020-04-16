const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

const deletePost = (req, res) => {
  const { postId } = req.params;

  Post.deletePost(postId)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const createPost = (req, res) => {
  const { userToken } = req.cookies;
  const payload = jwt.decode(userToken);
  const { id } = payload;
  const { title, post, name,
  } = req.body;

  Post.createPost(id, title, post, name)
    .then(() => Post.getLastCreated())
    .then((data) => res.status(201).json(data.rows[0]))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: '500 Internal Server Error' });
    });
};

const getPosts = (req, res) => {
  Post.getPosts()
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getUsersPosts = (req, res) => {
<<<<<<< HEAD
  const { userToken } = req.cookies;
  const payload = jwt.decode(userToken);
  const { id } = payload;
=======
  const { id } = req.params;
>>>>>>> 61bd1ca7d0dd2b2a5d5306a1b54752bb7e3c25c9
  Post.getUsersPosts(id)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: '500 Internal Server Error' });
    });
};

const updatePost = (req, res) => {
  const { post_id, title, post, name } = req.body;

  Post.updatePost(post_id, title, post, name)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: '500 Internal Server Error' });
    });
}

module.exports = {
  createPost,
  getPosts,
  getUsersPosts,
  deletePost,
<<<<<<< HEAD
  updatePost,
};
=======
};
>>>>>>> 61bd1ca7d0dd2b2a5d5306a1b54752bb7e3c25c9
