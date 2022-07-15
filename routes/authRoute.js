const express = require("express");
const router = express.Router();
const { register, login, logout, checkAuth } = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkAuth", checkAuth);

module.exports = router;
