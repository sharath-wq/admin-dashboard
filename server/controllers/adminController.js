const User = require("../models/user");

exports.dashboard = async (req, res) => {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1;

    try {
        const users = await User.aggregate([
            { $sort: { updatedAt: -1 } },
            { $skip: perPage * page - perPage },
            { $limit: perPage },
        ]);

        const count = await User.countDocuments();

        if (req.session.user && req.session.user.isAdmin) {
            res.render("dashboard", {
                title: "Dashboard",
                users,
                current: page,
                pages: Math.ceil(count / perPage),
            });
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.view = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.render("admin/view", { title: user.name, user });
    } catch (error) {
        console.log(error);
    }
};

exports.edit = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.render("admin/edit", { title: "Edit", user });
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
        res.redirect(`/admin/view/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
};

exports.searchUser = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
        const customers = await User.find({
            $or: [
                { name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
                { username: { $regex: new RegExp(searchNoSpecialChar, "i") } },
            ],
        });
        res.render("admin/search", { title: "Search", customers });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        res.redirect("/admin");
    } catch (error) {
        console.log(error);
    }
};
