const express = require("express");
const app = express();
const blogsRouter = require("./routes/blogs");

app.get("/", (req, res) => {
    res.send({error:"Unsupported"});
});

app.use("/posts", blogsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);