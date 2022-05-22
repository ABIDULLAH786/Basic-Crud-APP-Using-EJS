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


const connectDatabse = require("./config/connection")
connectDatabse();

// importing user schema from module/UserModule
const user_model = require("./models/UserModel")



app.get("/", async (req, res) => {
    const data = await user_model.find();
    res.render("home", { data: data })
    // console.log(data)
    // res.sendFile(__dirname + '/views/form.html')
})
app.post("/new", async (req, res) => {

    // console.log("Img Name: ", req.files.img)
    const { name, email } = req.body;
    const file = req.files.img;

    const result = await user_model.create({ name, email, image: file.name });

    file.mv(`./public/img/` + file.name, async (e) => {
        if (e)
            console.log("error in image uploding")
        else
            console.log("Image uploaded")
    })
    res.redirect("/");
})

app.get("/insert", (req, res) => {
    console.log("insert calll")
    res.render("insert");
    // res.sendFile(__dirname + '/views/insert.ejs')
})
app.get("/delete/:id", async (req, res) => {
    const { id } = req.params;

    const result = await user_model.findByIdAndDelete(id);
    res.redirect("/")
    // res.sendFile(__dirname + '/views/home.ejs')
})

app.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    const result = await user_model.findById(id);
    // console.log(result)

    res.render("update", { result })
    // res.sendFile(__dirname + '/views/home.ejs')
})
app.post("/update", async (req, res) => {
    const { id, name, email } = req.body;
    if (req.files) {
        const img = req.files.img;
        await user_model.updateOne({ _id: id }, { $set: { name: name, email: email, image: img.name } });
        img.mv("./public/img/" + img.name, async (e) => {
            if (e)
                console.log("Image not updated")
            else
                console.log("Image updated")
        })
    }
    else
        await user_model.updateOne({ _id: id }, { $set: { name: name, email: email } });


    res.redirect("/")
    // res.sendFile(__dirname + '/views/home.ejs')
})
app.listen(9000, () => console.log("Srever is listening to port 9000...?"))

