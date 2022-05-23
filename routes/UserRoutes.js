const express = require("express")
const router = express.Router();
const {getAllUsers, addNewUser, findUserById, loadInsert, signInPage, loadUsersTable, updateUserById, deletById} = require("../controller/UserController")
// auth/:method
router.route("/auth/:method").get(signInPage);
router.route("/").get(getAllUsers);
router.route("/delete/:id").get(deletById);
router.route("/users").get(getAllUsers);
router.route("/user/:id").get(findUserById);
router.route("/insert").get(loadInsert);

router.route("/table").post(loadUsersTable);


router.route("/update").post(updateUserById); 
router.route("/new").post(addNewUser); 



module.exports =  router;