const UserSchema = require("../models/UserModel")

exports.signInPage = (req, res) => {
    let method = req.params.method;
    if (method == "login" || method == "signin") {
        method = "signin"
    }
    else
        method = "signup"
    res.render("auth", { method })
}
exports.getAllUsers = async (req, res) => {
    const data = await UserSchema.find();
    res.render("home", { data: data })
    // console.log(data)
    // res.sendFile(__dirname + '/views/form.html')
}



// Delete the user
exports.deletById = async (req, res) => {
    const { id } = req.params;

    const result = await UserSchema.findByIdAndDelete(id);
    res.redirect("/")
    // res.sendFile(__dirname + '/views/home.ejs')
}

// find the user by id and render that data to update.ejs file
// this will casue when user click on update botton
exports.findUserById = async (req, res) => {
    const { id } = req.params;
    const result = await UserSchema.findById(id);
    // console.log(result)

    res.render("update", { result })
    // res.sendFile(__dirname + '/views/home.ejs')
}

exports.updateUserById = async (req, res) => {
    const { id, name, email } = req.body;
    // Checks if the user has update the image
    if (req.files) {
        const img = req.files.img;
        //the trim() is used to remove extra spaces from both ends fo string, so we can easily search data next time
        await UserSchema.updateOne({ _id: id }, { $set: { name: name.trim(), email: email.trim(), image: img.name } });

        //move image to public/img directory 
        img.mv("./public/img/" + img.name, async (e) => {
            if (e)
                console.log("Image not updated")
            else
                console.log("Image updated")
        })
    }
    else //if the image is not upadated then only update opther data only
        await UserSchema.updateOne({ _id: id }, { $set: { name: name, email: email } });

    //redirect the home page
    res.redirect("/")
    // res.sendFile(__dirname + '/views/home.ejs')
}

// load the insert data page
exports.loadInsert = (req, res) => {
    res.render("insert");
    // res.sendFile(__dirname + '/views/insert.ejs')
}

// it add new user when you fill the insert form
exports.addNewUser = async (req, res) => {
    // console.log("Img Name: ", req.files.img)
    const { name, email } = req.body;
    const file = req.files.img;

    const result = await UserSchema.create({ name: name.trim(), email: email.trim(), image: file.name });

    file.mv(`./public/img/` + file.name, async (e) => {
        if (e)
            console.log("error in image uploding")
        else
            console.log("Image uploaded")
    })
    res.redirect("/");
}

exports.loadUsersTable = async (req, res) => {
    const { name } = req.body;
    console.log(name)
    const data = await UserSchema.find({ name: name.trim() })

    res.render("userstable", { data })
} 