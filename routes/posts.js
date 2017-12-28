const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", (req,res) => {
    Post.find( (err, posts) => {
        if (err) {
            res.send(err);
        }

        res.json(posts);
    });
});

router.get("/:id", (req,res) => {
   const id = req.params.id;
   Post.findById(id, (err, foundPost) => {
        if (err) {
            res.send(err);
        }

        res.json(foundPost);
   });
});

router.post("/", (req,res) => {
    const blogPost = req.body;

    const post = new Post();
    post.title = blogPost.title;
    post.text = blogPost.text;

    post.save( (err) => {
        if (err) {
            res.send(err);
        }

        res.json({message: "Post was added", data: post});
    } );
});

router.put("/:id", (req,res) => {
    res.json({success: "not implemented yet"});
});

router.delete("/:id", (req,res) => {
    res.json({success: "not implemented yet"});
});

module.exports = router;