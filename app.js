// If you dont understand the below two lines of code just ignore it 
// it onstall a dotenv package to use our defined constants in file config.env
const dotenv = require("dotenv")
dotenv.config({ path: "./config/config.env" })

// Focus on code form here
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.static(path.join(__dirname,"public")))

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

const UserRoutes = require("./routes/UserRoutes")
const LogRoutes = require("./routes/LogRoutes")
app.use(UserRoutes)
app.use(LogRoutes)





// if you don't understand the below app.listen because of CONNSTANT are used 
// Then just comment it and then use the second app.listen with static defined port 6000
// app.listen(process.env.PORT, () => {
//     console.log(`Server is port ${process.env.PORT} in ${process.env.NODE_ENV}`)
// })

// Runnig server with static port 6000 (you can change it if 6000 is not working)
app.listen(9000, () => {
    console.log(`Server connected to port 6000...`)
})
