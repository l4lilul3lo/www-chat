const express = require("express");
const router = express.Router();

const { getRooms, getCafeInfo } = require("../controllers/rooms");

router.get("/getRooms", getRooms);
router.get("/getCafeInfo", getCafeInfo);
// router.post("/roomAuth", roomAuth);
module.exports = router;
