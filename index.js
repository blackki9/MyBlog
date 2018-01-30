const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const postsRouter = require("./routes/posts");
const usersRouter = require('./routes/users');
const keys = require('./config/keys');

//app configurations

mongoose.connect(keys.mongoURI);

app.use(bodyParser.urlencoded({
    extended: true
}));
//Routing
app.get("/", (req, res) => {
    res.json({error:"Unsupported"});
});

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running");
});