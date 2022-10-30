import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,  // userId
    tags: [String],
    selectedFile: String,  // conver to image using base64
    // likeCount:{
    //     type: Number,
    //     default: 0
    // },
    likes: {
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
