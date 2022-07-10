// Global middleware (app)

const userIsLoggedMiddleware = (req, res, next) => {
  res.locals.userIsLogged = false;
  next();
}

module.exports = userIsLoggedMiddleware;