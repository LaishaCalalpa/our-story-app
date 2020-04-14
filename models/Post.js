const db = require('../db');

class Post {
  static deletePost(postId) {
    const queryText = 'DELETE FROM posts WHERE id = $1';
    return db.query(queryText, [postId]);
  }
}

module.exports = Post;
