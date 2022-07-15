const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUserImage,
  updateSettings,
} = require("../controllers/users");
const { isAuth } = require("../middleware/isAuth");

router.get("/getUser", isAuth, getUser);
router.post("/updateUserImage", isAuth, updateUserImage);
router.post("/updateSettings", isAuth, updateSettings);

module.exports = router;
