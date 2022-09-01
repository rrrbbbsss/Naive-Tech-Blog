const { Comment } = require("../models");

const CommentData = [
  {
    comment_text: "cool",
    user_id: 1,
    post_id: 2,
  },
  {
    comment_text: "no way",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "stop",
    user_id: 2,
    post_id: 1,
  },
];

const seedComment = () => Comment.bulkCreate(CommentData);

module.exports = seedComment;
