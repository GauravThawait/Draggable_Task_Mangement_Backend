import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { ApiError } from "./ApiError.js";

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * ✅ Uploads an image buffer directly to Cloudinary
 * @param {Buffer} fileBuffer - The image file buffer
 * @param {String} folder - The Cloudinary folder to store the image
 * @returns {Promise<String>} - URL of the uploaded image
 */
const uploadToCloudinary = (fileBuffer, folder = "posts") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) {
          return reject(new ApiError(500, "Image upload failed"));
        }
        resolve(result.secure_url);
      }
    );

    // Convert buffer to a readable stream and pipe it
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

// ✅ Export Cloudinary Instance & Upload Function
export { cloudinary, uploadToCloudinary };
