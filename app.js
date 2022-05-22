const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(fileUpload());


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.static("public"));
app.set('view engine', 'ejs');

// importing the database conneciton cuntion and excuting it 
const connectDatabse = require("./config/connection")
connectDatabse();

// importing user schema from module/UserModule
const UserSchema = require("./models/UserModel")


const UserRoutes = require("./routes/UserRoutes")
app.use(UserRoutes)

app.listen(9000, () => console.log("Srever is listening to port 9000...?"))

