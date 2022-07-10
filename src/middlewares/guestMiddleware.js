const guestMiddleware = (req, res, next) => {
  if (req.session.userIsLogged) {
    return res.redirect("/users/profile");
  }
  next();
};

module.exports = guestMiddleware;
