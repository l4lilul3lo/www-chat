const express = require("express");
const router = express.Router();

const { getRooms, getCafeInfo } = require("../controllers/rooms");

router.get("/getRooms", getRooms);
router.get("/getCafeInfo", getCafeInfo);
module.exports = router;
