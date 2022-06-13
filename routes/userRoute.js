const express = require("express");
const router = express.Router();
const { register, login, getUser, checkAuth } = require("../controllers/user");
const { isAuth } = require("../middleware/isAuth");
// import controllers here.
// import auth middleware for anything requiring authentication

router.post("/register", register);
router.post("/login", login);
router.get("/getUser", isAuth, getUser);
router.get("/checkAuth", checkAuth);

module.exports = router;
