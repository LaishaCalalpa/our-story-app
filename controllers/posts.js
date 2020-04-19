const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

const deletePost = (req, res) => {
  const { id } = req.params;

  Post.deletePost(id)
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

const viewUsersPosts = (req, res) => {
  const { id } = req.params;

  Post.getUsersPosts(id)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: '500 Internal Server Error' });
    });
};

const getUsersPosts = (req, res) => {
  const { userToken } = req.cookies;
  const payload = jwt.decode(userToken);
  const { id } = payload;

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
  updatePost,
  viewUsersPosts,
};
