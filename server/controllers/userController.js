const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.home = async (req, res) => {
    try {
        if (req.session.user && !req.session.user.isAdmin) {
            res.redirect("/home");
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.log(error);
    }
};

exports.homepage = async (req, res) => {
    try {
        if (req.session.user && !req.session.user.isAdmin) {
            res.render("home", { title: req.session.user.name });
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.log(error);
    }
};

exports.loginpage = async (req, res) => {
    try {
        const message = req.query.message || "";
        if (req.session.user && !req.session.user.isAdmin) {
            res.redirect("/home");
        } else if (req.session.user && req.session.user.isAdmin) {
            res.redirect("/admin");
        } else {
            res.render("login", { title: "Login / Register", message });
        }
    } catch (err) {
        console.log(err);
    }
};

exports.register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ email: email }, { username: username }] });

        if (existingUser) {
            res.redirect("/login?message=Email%20or%20username%20already%20exists");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name: name,
                username: username,
                email: email,
                password: hashedPassword,
            });
            await newUser.save();
            req.session.user = newUser;
            res.redirect("/home");
        }
    } catch (error) {
        console.log(error);
        res.redirect("/login?message=An%20error%20occurred%20during%20registration");
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (user) {
            // Compare the hashed password with the entered password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                req.session.user = user;
                if (user.isAdmin) {
                    res.redirect("/admin");
                } else {
                    res.redirect("/home");
                }
            } else {
                res.redirect("/login?message=Invalid%20Credentials%20Please%20try%20again");
            }
        } else {
            res.redirect("/login?message=Invalid%20Credentials%20Please%20try%20again");
        }
    } catch (error) {
        console.log(error);
        res.redirect("/login");
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.user = null;
        res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
};
