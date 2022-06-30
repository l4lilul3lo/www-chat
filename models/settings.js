const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");
const { uuidPrimaryKey } = require("./sharedColumns");

const Settings = sequelize.define("settings", {
  id: uuidPrimaryKey,
  message_color: {
    type: DataTypes.STRING,
    defaultValue: "black",
  },
  message_background: {
    type: DataTypes.STRING,
    defaultValue: "none",
  },
});

async function createSettingsDB(userId) {
  console.log("user id in create settins", userId);
  await Settings.create({ userId });
}

module.exports = { Settings, createSettingsDB };
