import { Router } from "express";
import auth from "../middleware/auth.js";
import { createTask, deleteTask, getAllTask, taskUpdate } from "../controllers/task.controller.js";

const router = Router()

router.route("/create").post(auth, createTask)
router.route("/update").put(auth, taskUpdate)
router.route("/get-all").get(auth, getAllTask)
router.route("/delete").post(auth, deleteTask)


export default router