const {
  getUserByIdDB,
  getUserByNameDB,
  createUserDB,
} = require("../models/user");

const { getRoomByIdDB } = require("../models/room");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, password } = req.body;
  console.log("username in register controller", name);
  console.log("password in register controller", password);
  const user = await getUserByNameDB(name);

  if (user) {
    return res.json({ message: "Username Taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user_id = await createUserDB(name, hashedPassword);

  return res.json({ message: "Registration Successful" });
};

const login = async (req, res) => {
  const { name, password } = req.body;
  // get user by username,  if it doesn't exist username or password is incorrect.
  const user = await getUserByNameDB(name);

  if (!user) {
    return res
      .status(401)
      .json({ message: "username or password is incorrect" });
  }

  let isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return res
      .status(401)
      .json({ message: "username or password is incorrect" });
  }

  req.session.userId = user.id;

  return res.json({ id: user.id, name: user.name, image: user.image });
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
  console.log("USER IN USER CONTROLLER", user);
  res.json({ user });
};

const getUsers = async (req, res) => {
  const { roomId } = req.body;
};

module.exports = { login, register, getUser, checkAuth, getUsers };
