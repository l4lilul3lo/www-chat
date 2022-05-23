const isAuth = (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).send("Unauthorized");
  }

  next();
};

module.exports = { isAuth };
