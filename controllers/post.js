const Post = require("../models/post");
const moment = require('moment');

const postToShowPost = (post) => {
    return {
        postId: post._id,
        text: post.text,
        title: post.title,
        createdAt: post.createdAt
    }
}

exports.getAllPosts = (req,res) => {
    Post.find( (err, posts) => {
        if (err) {
            res.send(err);
        }
        const postsToSend = posts.map(postToShowPost)
        res.json(postsToSend);
    });
};

exports.getPostById = (req,res) => {
   const id = req.params.id;
   Post.findById(id, (err, foundPost) => {
        if (err) {
            res.send(500,err);
        }

        res.json(postToShowPost(foundPost));
   });
};

exports.createNewPost = (req,res) => {
    const blogPost = req.body;
    if (!blogPost.title || !blogPost.text) {
        res.send(400,{error: "You should provide title and text"});
        return;
    }
    // TODO validation
    const post = new Post();
    post.title = blogPost.title;
    post.text = blogPost.text;
    post.userId = req.user._id;
    post.createdAt = moment().unix();

    post.save( (err) => {
        if (err) {
            res.send(500,err);
        }

        res.json({message: "Post was added", data: postToShowPost(post)});
    } );
};

exports.updatePost = (req,res) => {
    const id = req.params.id;

    Post.findById(id, (err, foundPost) => {
        if (err) {
            res.send(err);
        }

        if (req.user._id === foundPost.userId) {
            return res.send(400, "You can't edit this post. You must be a creator of post to do it");
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
                res.json(postToShowPost(foundPost));
            }
        })

    });
};

exports.deletePost = (req,res) => {
    const id = req.params.id;

    Post.findByIdAndRemove(id, (err,deletedPost) => {
        if (err) {
            res.send(err);
        }

        if (req.user._id === deletedPost.userId) {
            return res.send(400, "You can't delete this post. You must be a creator of post to do it");
        }

        res.json({message: "Post was deleted"});
    })
};