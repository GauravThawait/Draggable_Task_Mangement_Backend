import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    caption : {
        type : String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Post = mongoose.model("Post", postSchema)