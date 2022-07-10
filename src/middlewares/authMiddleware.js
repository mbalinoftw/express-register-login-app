const authMiddleware = (req, res, next) => {
  if (!req.session.userIsLogged) {
    return res.redirect("/users/login");
  }
  next();
};

module.exports = authMiddleware;
