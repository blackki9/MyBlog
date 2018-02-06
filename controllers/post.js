const Post = require("../models/post");

exports.getAllPosts = (req,res) => {
    Post.find( (err, posts) => {
        if (err) {
            res.send(err);
        }

        res.json(posts);
    });
};

exports.getPostById = (req,res) => {
   const id = req.params.id;
   Post.findById(id, (err, foundPost) => {
        if (err) {
            res.send(err);
        }

        res.json(foundPost);
   });
};

exports.createNewPost = (req,res) => {
    const blogPost = req.body;
    if (!blogPost.title || !blogPost.text) {
        res.send({error: "You should provide title and text"});
        return;
    }
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
};

exports.updatePost = (req,res) => {
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

        foundPost.save((err,savedPost) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json(foundPost);
            }
        })

    });
};

exports.deletePost = (req,res) => {
    const id = req.params.id;
    Post.findByIdAndRemove(id, (err) => {
        if (err) {
            res.send(err);
        }

        res.json({message: "Post was deleted"});
    })
};