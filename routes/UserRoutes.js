const express = require("express")
const router = express.Router();
const {getAllUsers, addNewUser, findUserById, loadInsert, updateUserById, deletById} = require("../controller/UserController")

router.route("/").get(getAllUsers);
router.route("/insert").get(loadInsert);
router.route("/delete/:id").get(deletById);
router.route("/user/:id").get(findUserById);

router.route("/update").post(updateUserById); 
router.route("/new").post(addNewUser); 



module.exports =  router;