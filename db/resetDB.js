const { sequelize } = require("./dbConfig");
const { resetDB } = require("./dbFunctions");
(async () => {
  await resetDB();
  await sequelize.close();
})();
