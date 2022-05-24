const UserSchema = require("../models/UserModel");
const bcrypt = require("bcrypt")

async  function checkUser(email, password) {
    let errmsg = ""
    const user = await UserSchema.findOne({ email: email.trim()});
    if (user.password)
     {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
           return true;
        }
    } else {
        console.log("Please enter a valid name or user name")
        errmsg = "Please enter a valid name or user name";
        return false;
    }

}
exports.Login = async (req, res) => {
    // let errmsg=""
    let isfound = await checkUser(req.body.email, req.body.password);
    if(isfound){
        res.redirect("/")
    }
    else
        res.redirect("signin")
    // const {email,password}=req.body
    // bcrypt.compare(password, 5, function(err, result) {
    //     if(result)
    //     {

    //     }
    // });
    // const result = await UserSchema.find({email:email.trim(),password:password});
    // if(result.length>0)
    // {
    //     res.redirect("/")
    // }else{
    //     console.log("Please enter a valid name or user name")
    //     errmsg = "Please enter a valid name or user name";
    //     res.render("signin")
    // }

    // res.render("home")
}
exports.Register = async (req, res) => {
    const { name, email, password } = req.body
    console.log(password)
    const result = await UserSchema.create({ name: name.trim(), email: email.trim(), password: password });
    console.log(result)
    if (result) {
        res.redirect("signin")
    } else {
        console.log("Please enter a valid name or user name")
        errmsg = "Please enter a valid name or user name";
        // res.render("signup")
    }

}
exports.RegisterPage = async (req, res) => {

    res.render("signup")
}
exports.LoginPage = async (req, res) => {
    res.render("signin")

}