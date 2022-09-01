const { Post } = require("../models");

const PostData = [
  {
    title: "wha",
    content: "asdf asdf",
    user_id: 1,
  },
  {
    title: "wow",
    content: "wow wow wow",
    user_id: 1,
  },
  {
    title: "huh",
    content: "huh huh huh",
    user_id: 2,
  },
];

const seedPost = () => Post.bulkCreate(PostData);

module.exports = seedPost;
