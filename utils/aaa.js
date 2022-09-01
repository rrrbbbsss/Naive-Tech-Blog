const AAA = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // todo: authorization, accounting, auditing...
    next();
  }
};

const PUB = (req, res, next) => {
  // ....
  next();
};
module.exports = { AAA, PUB };
