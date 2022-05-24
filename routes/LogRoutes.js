const express = require("express");
const router = express.Router();


const {LoginPage, Login, RegisterPage, Register} = require("../controller/LogController")
router.get("/signin",LoginPage);
router.post("/signin",Login);
router.get("/signup",RegisterPage);
router.post("/signup",Register);

module.exports = router;