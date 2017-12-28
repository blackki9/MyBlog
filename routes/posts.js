const express = require("express");
const router = express.Router();
const Post = require("../models/post");

//TODO handling errors

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

    // TODO validation
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
    const id = req.params.id;
    Post.findById(id, (err, foundPost) => {
        if (err) {
            res.send(err);
        }

        const title = req.body.title;
        const text = req.body.text;

        if (title) {
            foundPost.title = title;
        }

        if (text) {
            foundPost.text = text;
        }

        res.json(foundPost);
    });
});

router.delete("/:id", (req,res) => {
    const id = req.params.id;
    Post.findByIdAndRemove(id, (err) => {
        if (err) {
            res.send(err);
        }

        res.json({message: "Post was deleted"});
    })
});

module.exports = router;