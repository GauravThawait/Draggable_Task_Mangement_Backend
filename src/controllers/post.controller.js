import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinary from "../utils/Cloudinary.js";


const createPost = asyncHandler(async(req, res) => {
    
    const {caption} = req.body
    const userId = req.user._id

    if(caption === undefined || caption === null || caption.trim() === ""){
        throw new ApiError(400, "Caption can't be empty")
    }

    if (!req.file) {
        throw new ApiError(400, "Image is required");
      }


    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "posts", // Optional folder name in Cloudinary
          resource_type: "image",
        });
    
        const imageUrl = result.secure_url; // Cloudinary URL for the uploaded image
    
        // Save the image URL and caption in your database
        const newPost = await Post.create({
          caption,
          imageUrl,
          user : userId
        });
        
        console.log("new post created successfully")
    
        return res.status(201).json({
          success: true,
          message: "Post created successfully",
          data: newPost,
        });

      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw new ApiError(500, "Image upload failed");
      }

})

const getAllPost = asyncHandler( async(req, res) => {
    const data = await Post.find().populate("user").sort({createdAt : -1})


    if(!data){
        throw new ApiError(500, "No data found")
    }

    return res.status(200).json(new ApiResponse(200, data, "Post fetch Successfully"))
})

export {
    createPost,
    getAllPost
}