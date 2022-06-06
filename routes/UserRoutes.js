const express = require("express")
const router = express.Router();
const {getAllUsers, addNewUser, findUserById, loadInsert, signInPage, loadUsersTable, updateUserById, deletById, home} = require("../controller/UserController");
const Middleware_IsAuthorized = require("../middlewares/isAuthorized");
// auth/:method
// router.route("/auth/:method").get(signInPage);
router.route("/").get(home);
router.route("/delete/:id").get(deletById);
router.route("/users").get(Middleware_IsAuthorized, getAllUsers);
router.route("/user/:id").get(findUserById);
router.route("/insert").get(Middleware_IsAuthorized,loadInsert);

router.route("/table").post(loadUsersTable);


router.route("/update").post(updateUserById); 
router.route("/new").post(addNewUser); 



module.exports =  router;