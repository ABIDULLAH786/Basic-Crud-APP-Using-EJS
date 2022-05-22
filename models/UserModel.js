const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model("Users",UserSchema);