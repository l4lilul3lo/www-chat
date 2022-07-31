const bcrypt = require("bcrypt");
const { getUserByNameDB, createUserDB } = require("../models/user");

const register = async (req, res) => {
  const { name, password } = req.body.formData;

  const user = await getUserByNameDB(name);
  if (user) {
    return res.json({ message: "Username Taken" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await createUserDB(name, hashedPassword);
  return res.json({ message: "success" });
};

const login = async (req, res) => {
  const { name, password } = req.body.formData;
  const user = await getUserByNameDB(name);
  if (!user) {
    return res
      .status(401)
      .json({ message: "username or password is incorrect" });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return res
      .status(401)
      .json({ message: "username or password is incorrect" });
  }

  req.session.userId = user.id;

  return res.json({ message: "success" });
};

const checkAuth = async (req, res, next) => {
  if (req.session && req.session.userId) {
    res.json({ isAuth: true });
    return next();
  }

  return res.status(401).json({ isAuth: false });
};

const logout = async (req, res) => {
  req.session.destroy();
  res.send("logged out");
};

module.exports = { register, login, checkAuth, logout };
