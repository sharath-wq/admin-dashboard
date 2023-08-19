const User = require("../models/user");

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

exports.loginpage = async (req, res) => {
    try {
        const message = req.query.message || "";
        if (req.session.user && !req.session.user.isAdmin) {
            res.redirect("/home");
        } else if (req.session.user && req.session.user.isAdmin) {
            res.redirect("/dashboard");
        } else {
            res.render("login", { title: "Login / Register", message });
        }
    } catch (err) {
        console.log(err);
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

exports.register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ email: email }, { username: username }] });

        if (existingUser) {
            res.redirect("/login?message=Email%20or%20username%20already%20exists");
        } else {
            const newUser = new User({
                name: name,
                username: username,
                email: email,
                password: password,
            });
            await User.create(newUser);
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
        if (user && user.password === password) {
            req.session.user = user;
            if (user.isAdmin) {
                res.redirect("/dashboard");
            } else {
                res.redirect("/home");
            }
        } else {
            console.log("Invalid Credentials");
            res.redirect("/login");
        }
    } catch (error) {
        console.log(error);
        res.redirect("/login");
    }
};

// exports.homepage = async (req, res) => {
//     let perPage = 10;
//     let page = req.query.page || 1;

//     try {
//         const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 } }])
//             .skip(perPage * page - perPage)
//             .limit(perPage)
//             .exec();

//         const count = await Customer.count();
//         res.render("index", { title: "Home", customers, current: page, pages: Math.ceil(count / perPage) });
//     } catch (error) {
//         console.log(error);
//     }
// };

exports.dashboard = async (req, res) => {
    let perPage = 10;
    let page = req.query.page || 1;
    console.log(req.query.page);
    try {
        const users = await User.aggregate([{ $sort: { updatedAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        const count = await User.count();
        if (req.session.user.isAdmin) {
            res.render("dashboard", { title: "Dashboard", users, current: page, pages: Math.ceil(count / perPage) });
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.log(error);
    }
};

exports.view = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.render("user/view", { title: user.name, user });
    } catch (error) {
        console.log(error);
    }
};

exports.edit = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.render("user/edit", { title: "Edit", user });
    } catch (error) {
        console.log(error);
    }
};

exports.editUser = async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                updatedAt: Date.now(),
            }
        );
        res.redirect(`/view/${req.params.id}`);
    } catch (error) {
        console.log(error);
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
