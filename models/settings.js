const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/dbConfig");
const { uuidPrimaryKey } = require("./sharedColumns");
const { User } = require("./user");
const Settings = sequelize.define(
  "settings",
  {
    id: uuidPrimaryKey,
    message_color: {
      type: DataTypes.STRING,
      defaultValue: "black",
    },
    message_background: {
      type: DataTypes.STRING,
      defaultValue: "none",
    },
  },
  { underscored: true }
);

User.hasOne(Settings);
Settings.belongsTo(User);

module.exports = { Settings };
