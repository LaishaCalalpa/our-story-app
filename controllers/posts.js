const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

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

  const { title, post, name } = req.body;

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
  const { id } = req.params;
  const { title, post, name,
  } = req.body;

  Post.updatePost(id, title, post, name)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: '500 Internal Server Error' });
    });
};

const getPostById = (req, res) => {
  const { id } = req.params;
  
  Post.getPostById(id)
    .then((data)=> res.json(data.rows[0]))
    .catch((err) => res.send(err));
};

module.exports = {
  createPost,
  getPosts,
  getUsersPosts,
  deletePost,
  updatePost,
  getPostById,
};
