const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const { AAA, PUB } = require("../utils/aaa");

router.get("/", AAA, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
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
      res.render("dashboard", {
        posts,
        loggedIn: req.session.loggedIn,
        owned: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "there was an error" });
    });
});

router.get("/addpost", AAA, (req, res) => {
  res.render("add-edit-post", {
    loggedIn: req.session.loggedIn,
    newpost: true,
  });
});

router.get("/editpost/:id", AAA, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "createdAt"],
    order: [["createdAt", "DESC"]],
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
    res.render("add-edit-post", {
      post,
      loggedIn: req.session.loggedIn,
      editpost: true,
    });
  });
});

module.exports = router;
