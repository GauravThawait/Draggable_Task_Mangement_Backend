import Router from "express"
import { emailResetPassword, login, register } from "../controllers/user.controller.js"

const router = Router()

router.route("/signup").post(register)
router.route("/signin").post(login)
router.route("/email-reset-password").post(emailResetPassword)
router.route("/verify-otp")
router.route("/reset-password")

export default router