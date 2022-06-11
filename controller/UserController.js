const UserSchema = require("../models/UserModel");
const bcrypt = require("bcrypt");

async function authenticate(req) {
    const { email, password } = req.body;
    let errmsg = ""
    const user = await UserSchema.findOne({ email: email.trim() });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.uid = user._id;
            isCurrentlySignIn = true;
            return true;
        }
    } else {
        console.log("Please enter a valid name or user name")
        errmsg = "Please enter a valid name or user name";
        return false;
    }

}
exports.Login = async (req, res) => {
    let isfound = await authenticate(req);
    if (isfound) {
        req.session.isAuth = true;
        res.redirect("/")
    }
    else
        res.redirect("signin")
}

exports.Logout = async (req, res) => {
    req.session.destroy();
    isCurrentlySignIn = false;
    res.redirect("/signin");
}
exports.Register = async (req, res) => {
    const { name, email, password } = req.body
    console.log(password)

    const findUser = UserSchema.findOne({ email })
    if (findUser.length != 0) {

        const result = await UserSchema.create(
            {
                name: name.trim(),
                email: email.trim(),
                password: password
            },
            (err,result) => {
                if (err) {
                    req.flash("data", req.body);
                    const errors = Object.keys(err.errors).map(
                        (itm) => err.errors[itm].message
                    );
                    req.flash("validationErrors", errors);
                    return res.redirect("/signup");
                }
            });
        console.log(result)
        if (result) {
            res.redirect("signin")
        } else {
            console.log("Please enter a valid name or user name")
            errmsg = "Please enter a valid name or user name";
            res.render("signup")
        }
    }
    else {
        console.log("email already registered")
        errmsg = "Please enter an unused email";
        res.render("signup")
    }

}
exports.RegisterPage = async (req, res) => {
    const data = req.flash("data")[0];
    let email = "";

    if (data) {
        email = data.email;
    }

    res.render("signup", {
        errors: req.flash("validationErrors"),
        email,
    });
}
exports.LoginPage = async (req, res) => {
    res.render("signin")
}

// exports.signInPage = (req, res) => {
//     let method = req.params.method;
//     if (method == "login" || method == "signin") {
//         method = "signin"
//     }
//     else
//         method = "signup"
//     res.render("auth", { method })
// }