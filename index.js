const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const postsRouter = require("./routes/posts");

//app configurations

app.use(bodyParser.json( {type: 'application/*+json'} ));

//Routing
app.get("/", (req, res) => {
    res.send({error:"Unsupported"});
});

app.use("/posts", postsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running");
});