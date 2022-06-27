const { Sequelize, DataTypes } = require("sequelize");

const uuidPrimaryKey = {
  type: Sequelize.UUID,
  defaultValue: Sequelize.UUIDV4,
  primaryKey: true,
};

module.exports = { uuidPrimaryKey };
