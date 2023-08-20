const express = require("express");
const connectDatabase = require("./server/config/db");
const session = require("express-session");
const nocache = require("nocache");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3000;

connectDatabase();

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(nocache());

app.set("view engine", "ejs");

app.use(
    session({
        secret: "montyxgreen",
        resave: false,
        saveUninitialized: true,
    })
);

const adminRoutes = require("./server/routes/admin");
const userRoutes = require("./server/routes/user");

app.use("/admin", adminRoutes);
app.use("/", userRoutes);

app.get("*", (req, res) => {
    res.render("404", { title: "404 page not found" });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
