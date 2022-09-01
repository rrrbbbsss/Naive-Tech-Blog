const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const { AAA, PUB } = require("../utils/aaa");

router.get("/", PUB, (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "content", "createdAt"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbData) => {
      const posts = dbData.map((post) => post.get({ plain: true }));
      console.log(posts);
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "there was an error" });
    });
});

router.get("/post/:id", PUB, (req, res) => {
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
  }).then((dbData) => {
    const post = dbData.get({ plain: true });
    console.log(post);
    res.render("postpage", { post, loggedIn: req.session.loggedIn });
  });
});

router.get("/login", PUB, (req, res) => {
  res.render("login-signup", { login: true });
});

router.get("/signup", PUB, (req, res) => {
  res.render("login-signup", { signup: true });
});

module.exports = router;
