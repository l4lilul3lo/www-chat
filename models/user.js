const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");
const { uuidPrimaryKey } = require("./sharedColumns");
const { Settings, createSettingsDB } = require("./settings");

const User = sequelize.define("user", {
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
});

User.hasOne(Settings, { as: "settings", foreignKey: "userId" });
Settings.belongsTo(User);

async function createUserDB(username, password) {
  const user = await User.create({ name: username, password: password });
  const userId = user.dataValues.id;
  await createSettingsDB(userId);
}

async function getUserByIdDB(user_id) {
  const user = await User.findAll({
    raw: true,
    nest: true,
    include: [
      {
        model: Settings,
        as: "settings",
        attributes: ["messageColor", "messageBackground"],
      },
    ],
    where: {
      id: user_id,
    },
    attributes: ["id", "name", "image"],
  });

  return user[0];
}

async function getUserByNameDB(username) {
  const res = await User.findAll({
    where: {
      name: username,
    },
    attributes: ["id", "name", "image", "password"],
  });

  return res[0]?.dataValues;
}

async function updateUserImageDB(url, userId) {
  await User.update(
    { image: url },
    {
      where: {
        id: userId,
      },
    }
  );
}

module.exports = {
  User,
  createUserDB,
  getUserByIdDB,
  getUserByNameDB,
  updateUserImageDB,
};
