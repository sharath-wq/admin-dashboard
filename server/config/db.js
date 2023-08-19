const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/auth";

module.exports = connectDatabase = async () =>
    await mongoose
        .connect(url, {})
        .then((result) => console.log("Database Connected Successfully"))
        .catch((error) => console.log(error));
