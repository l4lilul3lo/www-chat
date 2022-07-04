const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");
const { uuidPrimaryKey } = require("./sharedColumns");

const Settings = sequelize.define("settings", {
  id: uuidPrimaryKey,
  messageColor: {
    type: DataTypes.STRING,
    defaultValue: "#000000",
  },
  messageBackground: {
    type: DataTypes.STRING,
    defaultValue: "#FFFFFF",
  },
});

async function createSettingsDB(userId) {
  console.log("user id in create settins", userId);
  await Settings.create({ userId });
}

async function updateSettingsDB(userId, settings) {
  console.log("userId in update settings", userId);
  console.log("settings in update settings", settings);
  try {
    await Settings.update(settings, {
      where: { userId },
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { Settings, createSettingsDB, updateSettingsDB };
