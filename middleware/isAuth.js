const isAuth = (req, res, next) => {
  console.log("isAuth", req.session);
  if (!req.session.userId) {
    return res.status(401).send("Unauthorized");
  }

  next();
};

module.exports = { isAuth };
