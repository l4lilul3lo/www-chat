const { getUserDB } = require("../models/users/user");
const { getUserSettingsDB } = require("../models/users_settings/usersSettings");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, password } = req.body;
  const user = await getUserByNameDB(name);

  if (user) {
    return res.json({ message: "Username Taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await addUserDB(name, hashedPassword);
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

  req.session.user_id = user.id;
  const userSettings = await getUserSettingsDB(user.id);

  return res.json({
    user: { name: user.name, image: user.image, settings: userSettings },
  });
};

const getUser = async (req, res) => {
  const { user_id } = req.session;
  const user = await getUserDB(user_id);
  res.json(user);
};

module.exports = { login, register, getUser };
