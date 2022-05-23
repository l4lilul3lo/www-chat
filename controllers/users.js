const { getUsersDB } = require("../models/users/users");

const getUsers = async (req, res) => {
  const users = await getUsersDB();
  res.json({ users });
};

module.exports = { getUsers };
