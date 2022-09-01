const router = require("express").Router();
const { Comment, Post, User } = require("../../models");
const { AAA, PUB } = require("../../utils/aaa");

// GET /api/comment
// don't need to implement for requirements

// GET /api/comment/:id
// don't need to implement for requirements

// POST /api/comment
// todo: handle errors from input validation better
router.post("/", AAA, (req, res) => {
  // expects { comment_text: "asdf asdf", post_id: 10 }
  Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    user_id: req.session.user_id,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "there was an error" });
    });
});

// PUT /api/commit/:id
// don't need to implement for requirements

// DELETE /api/comment/:id
// don't need to implement for requirements
// but i'll implement it since it will bother me.

module.exports = router;
