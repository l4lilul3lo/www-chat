const express = require("express");
const router = express.Router();

const { getIsBlocked } = require("../controllers/roomsUsers");

router.post("/getIsBlocked", getIsBlocked);
module.exports = router;
