const {
  getUserDB,
  getUserByNameDB,
  addUserDB,
} = require("../models/users/users");
const { addUserSettingsDB } = require("../models/users_settings/usersSettings");
const { getUserSettingsDB } = require("../models/users_settings/usersSettings");
const { getRoomIdDB } = require("../models/rooms/rooms");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, password } = req.body;
  const user = await getUserByNameDB(name);

  if (user) {
    return res.json({ message: "Username Taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user_id = await addUserDB(name, hashedPassword);
  await addUserSettingsDB(user_id);
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

  return res.json({ message: "login success" });
};

const checkAuth = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ isAuth: false });
  }

  res.json({ isAuth: true });
};

const getUser = async (req, res) => {
  const userId = req.session.userId;
  const user = await getUserDB(userId);

  res.json({
    id: user.id,
    name: user.name,
    image: user.image,
    settings: {
      messageBackground: user.message_background,
      messageColor: user.message_color,
    },
  });
};

module.exports = { login, register, getUser, checkAuth };
