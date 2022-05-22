const mongoose = require("mongoose");

const connectDatabase = () =>{ mongoose.connect("mongodb://localhost:27017/usersdb",
    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.log("error in creating db");
            throw err;
        }
        console.log("Connected to MongoDB!!!");
    }
)}
module.exports = connectDatabase;
