const express = require("express");

const router = express.Router();

router.get("/", (req,res) => {
    res.send({blogPosts: "blogs posts list"});
});

router.get("/:id", (req,res) => {
    res.send({blogPost: {title: "test"}});
});

router.post("/", (req,res) => {
    const blogPost = req.params.post;
    res.send({success: "true"});
});

router.delete("/:id", (req,res) => {

});

module.exports = router;