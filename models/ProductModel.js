const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const ProductSchema = new mongoose.Schema({
    userId:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String
    },
    description: {
        type: String,
    },
    image: {
        type: String
    }
    
})



module.exports = mongoose.model("products",ProductSchema);