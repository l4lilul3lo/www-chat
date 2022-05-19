const db = require("./dbConfig");
const { createTables } = require("./dbSetup");

(async function resetDatabase() {
  console.log("DELETING TABLES!\n");
  await db.query(`DROP TABLE IF EXISTS users CASCADE`);
  await db.query(`DROP TABLE IF EXISTS rooms CASCADE`);
  await db.query(`DROP TABLE IF EXISTS rooms_users CASCADE`);
  await db.query(`DROP TABLE IF EXISTS users_settings CASCADE`);
  await db.query(`DROP TABLE IF EXISTS messages CASCADE`);
  await createTables();
})();
