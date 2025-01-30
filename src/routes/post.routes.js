import { Router } from "express";
import { createPost, getAllPost } from "../controllers/post.controller.js";
import { uploadFile } from "../utils/Filestorage.js";
import auth from "../middleware/auth.js";

const router = Router()

router.route('/create').post(auth, uploadFile.single('imageFile') , createPost)
router.route('/get-all').get(auth, getAllPost)

export default router 