const express = require("express");
const router = express.Router();
const { getMessages } = require("../controllers/messages");
router.post("/getMessages", getMessages);

module.exports = router;
