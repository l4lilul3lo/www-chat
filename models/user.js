const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");
const { uuidPrimaryKey } = require("./sharedColumns");

const User = sequelize.define(
  "user",
  {
    id: uuidPrimaryKey,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 32],
      },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    image: {
      type: DataTypes.STRING,
    },
  },
  { underscored: true }
);

async function addUserDB(username, password) {
  await User.create({ name: username, password: password });
}

async function getUserByIdDB(user_id) {
  const res = await User.findAll({
    where: {
      id: user_id,
    },
    attributes: ["id", "name", "image"],
  });

  return res[0]?.dataValues;
}

async function getUserByNameDB(username) {
  const res = await User.findAll({
    where: {
      name: username,
    },
  });

  return res[0]?.dataValues;
}
async function getUsersDB() {
  User.findAll({
    attributes: ["id", "name", "image"],
    where: {},
  });
}

module.exports = { User, addUserDB, getUserByIdDB, getUserByNameDB };
