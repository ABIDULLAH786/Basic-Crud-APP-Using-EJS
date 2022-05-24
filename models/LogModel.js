const mongoose = require("mongoose")

const LogSchema = mongoose.Schema({
    email:{
        type: String,
        required:[true, "Please Enter Email"]
    },
    password:{
        type: String,
        required:[true, "Please Enter Password"]
    }
})

module.exports = mongoose.model("login",LogSchema)