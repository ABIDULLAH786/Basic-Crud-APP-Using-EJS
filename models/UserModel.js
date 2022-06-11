const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String,
        required:[true, "Please Enter Email"],
        unique: true,
    },
    password:{
        type: String,
        required:[true, "Please Enter Password"]
    }
})
UserSchema.pre("save", function(next){
    const user = this;
    bcrypt.hash(user.password,5, function(req,hash){
        user.password = hash;
        next();
    })
});
const uniqueValidator = require('mongoose-unique-validator');
UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("users",UserSchema)