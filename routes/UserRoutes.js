const express = require("express")
const router = express.Router();
const {getAllUsers, addNewUser, findUserById, loadInsert, loadUsersTable, updateUserById, deletById} = require("../controller/UserController")

router.route("/").get(getAllUsers);
router.route("/delete/:id").get(deletById);
router.route("/user/:id").get(findUserById);
router.route("/insert").get(loadInsert);

router.route("/table").post(loadUsersTable);


router.route("/update").post(updateUserById); 
router.route("/new").post(addNewUser); 



module.exports =  router;