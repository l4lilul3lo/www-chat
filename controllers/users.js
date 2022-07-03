const bcrypt = require("bcrypt");
const {
  getUserByIdDB,
  getUserByNameDB,
  createUserDB,
  updateUserImageDB,
} = require("../models/user");

const register = async (req, res) => {
  const { name, password } = req.body;

  const user = await getUserByNameDB(name);
  if (user) {
    return res.json({ message: "Username Taken" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await createUserDB(name, hashedPassword);
  return res.json({ message: "success" });
};

const login = async (req, res) => {
  const { name, password } = req.body;
  console.log("username in login route", name);
  console.log("password in login route", password);
  const user = await getUserByNameDB(name);
  console.log(user);
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

const checkAuth = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ isAuth: false });
  }

  res.json({ isAuth: true });
};

const getUser = async (req, res) => {
  const userId = req.session.userId;
  const user = await getUserByIdDB(userId);
  res.json({ user });
};

const updateUserImage = async (req, res) => {
  const userId = req.session.userId;
  const { imageUrl } = req.body;
  console.log("image url in update user image", imageUrl);
  await updateUserImageDB(imageUrl, userId);
  res.json({ message: "success" });
};

module.exports = { login, register, getUser, checkAuth, updateUserImage };
