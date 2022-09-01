const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const { AAA, PUB } = require("../../utils/aaa");

// GET /api/user
// not needed for requirements

// GET /api/user/1
router.get("/:id", AAA, (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "content", "created_at"],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/user
// todo: better error messages from invalid inputs
router.post("/", PUB, (req, res) => {
  // epxects {username: 'blah', password: 'asdfasdf'}
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "There was an error " });
    });
});

// POST /api/user/login
router.post("/login", PUB, (req, res) => {
  // epxects {email: 'basf@asdf.com', passower: 'asdf'}
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbData) => {
    // Verify user
    if (!dbData) {
      res.status(400).json({ message: "No account found with that username" });
      return;
    }

    // Verify password
    const validPassword = dbData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbData.id;
      req.session.username = dbData.username;
      req.session.loggedIn = true;

      res.json({ user: dbData.username, message: "You are now logged in" });
    });
  });
});

// POST /api/user/logout
router.post("/logout", AAA, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// PUT /api/user/1
// endpoint not needed for requirements

// DELETE /api/user/1
// endpoint not needed for requirements

module.exports = router;
