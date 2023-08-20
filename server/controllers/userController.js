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
        const user = await User.findOne({ email: req.session.user.email });
        if (req.session.user && !req.session.user.isAdmin) {
            res.render("home", { title: req.session.user.name, user });
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.log(error);
    }
};

exports.editProfile = async (req, res) => {
    try {
        if (!req.session.user) {
            res.redirect("/login");
            return;
        }

        const user = await User.findOne({ email: req.session.user.email });

        if (!user) {
            res.redirect("/login");
            return;
        }

        if (!req.session.user.isAdmin) {
            res.render("user/edit-profile", { title: req.session.user.name, user });
        } else {
            res.redirect("/admin-dashboard");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request.");
    }
};
exports.updateProfile = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const updates = {
            name: name,
            username: username,
            email: email,
            updatedAt: Date.now(),
        };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(req.session.user._id, updates, { new: true });

        req.session.user = updatedUser;

        res.redirect("/home");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while updating the profile.");
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
