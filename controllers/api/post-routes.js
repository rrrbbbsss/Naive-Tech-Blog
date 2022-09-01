const router = require("express").Router();
const dbconn = require("../../config/connection");
const { Post, User, Comment } = require("../../models");
const { AAA, PUB } = require("../../utils/aaa");

// GET /api/post
router.get("/", PUB, (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "content", "createdAt"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "there was an error" });
    });
});

// GET /api/post/:id
router.get("/:id", PUB, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "createdAt"],
    order: [
      ["createdAt", "DESC"],
      [Comment, "createdAt", "DESC"],
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["comment_text", "createdAt"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No post was found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "there was an error" });
    });
});

// POST /api/post
// todo: better error messages if invalid input json
router.post("/", AAA, (req, res) => {
  // expects {title: 'blah', content: "asdf asdf asdf"}
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "there was an error" });
    });
});

// PUT /api/post/:id
router.put("/:id", AAA, (req, res) => {
  // expects {title: 'blah', content: "asdf asdf asdf"}
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "there was an error" });
    });
});

// DELETE /api/post/:id
router.delete("/:id", AAA, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "there was an error" });
    });
});

module.exports = router;
