// the logic code to handle request
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 2;
        const startIndex = (Number(page)-1) * LIMIT;  // get the starting index of every pate
        const total = await PostMessage.countDocuments({}); 

        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);  // sort posts by _id, get the newest posts
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// QUERY  -> /posts?page=1 -> page = 1
// PARAMS -> /posts/123    -> id   = 123

// /search?searchQuery= & tags=
export const getPostBySearch = async (req, res) => {
    const {searchQuery, tags} = req.query;
    try {
        const titleSearch = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or:[{title: titleSearch}, {tags: {$in: tags.split(',')}} ]});
        res.json({data: posts});
    } catch (error) {
        console.log("controllers/posts.js getPostBySearch" ,error);
        res.status(404).json({message: error.message});
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

export const updatePost = async(req, res) => {
    const {id: _id} = req.params;
    const post = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with that id');
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
    res.json(updatedPost);
}

export const deletePost = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that id');
    }
    await PostMessage.findByIdAndRemove(id);
    res.json({message: 'Post deleted sucessfully'});
}

export const likePost = async(req, res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({message: "Unauthenticated"});

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that id');
    }
    const post = await PostMessage.findById(id);

    // find if the userId already in the like list
    const index = post.likes.findIndex((id) => id===String(req.userId));
    if(index === -1){
        // like the post
        post.likes.push(req.userId);
    } else {
        // unlike the post
        post.likes.filter(userId => userId !== String(req.userId));
        // console.log("controller/posts.js");
        // console.log(req.userId);
        // console.log(post.likes[0] === String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    res.json(updatedPost);
}