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

module.exports = {
  deletePost,
};
