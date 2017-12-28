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

router.put("/:id", (req,res) => {
    res.send({success: "not implemented yet"});
});

router.delete("/:id", (req,res) => {
    res.send({success: "not implemented yet"});
});

module.exports = router;