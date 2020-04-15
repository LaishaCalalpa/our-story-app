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
  const {
    user_id, title, post, name,
  } = req.body;

  Post.createPost(user_id, title, post, name)
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
  const { user_id } = req.body;
  Post.getUsersPosts(user_id)
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: '500 Internal Server Error' });
    });
};

module.exports = {
  createPost,
  getPosts,
  getUsersPosts,
  deletePost,
};
