
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import sendDynamicEmail from "../utils/email.js";
import { sendEmailOtpTemplate } from "../utils/emailTemplate/authEmail.js";

const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // Set expiry to 10 minutes from now
    return { otp, otpExpiry };
  };

const tokenGeneration = async(userId) =>
{
    try {
        const user = await User.findById(userId)
        console.log(user._id)
        if(!user){
            throw new ApiError(404, "User not found");
        }

        const token = await user.generateToken()
        return token

    } catch (error) {
        console.error("Error in tokenGeneration:", error);
        throw new ApiError(500, "Token generation failed")
    }
}


const register = asyncHandler( async(req,res) => {
    console.log("register api hitted")
    const {name, email, password} = req.body

    if([name, email, password].some((item) => item === undefined || item === null || item.trim() === " ")){
        throw new ApiError(400, "Invalid input fields")
    }

    const existUser = await User.findOne({email : email})

    if(existUser){
        throw new ApiError(400, "Already User Exist")
    }

    const data = await User.create({
        name : name,
        email : email,
        password : password
    })

    if(!data){
        throw new ApiError(500, "Internal Server Error")
    }

    return res.status(200).json(new ApiResponse(200, data, "User Registered Successfully"))
})


const login = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    if([email, password].some((item) => item === undefined || item === null || item.trim() === " ")){
        throw new ApiError(400, "Invalid User Credentials")
    }

    const validUser = await User.findOne({email : email})

    if(!validUser){
        throw new ApiError(400, "No user found")
    }

    const isPasswordMatch = validUser.isPasswordCorrect(password)

    if(!isPasswordMatch){
        throw new ApiError(400, "Invalid Password")
    }

    const token = await tokenGeneration(validUser._id)
    console.log("Token : " , token);
    validUser["password"] = null
    validUser["otp"] = null
    validUser["otpExpiry"] = null

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("token", token, options)
    .json(
        new ApiResponse(
            200,
            {validUser , token},
            "User Login Successfully"
        )
        
    )

})



const emailResetPassword = asyncHandler( async(req, res) => {
    console.log("email reset passsword api hitted")
    const { email } = req.body

    if(email === undefined || email === null || email.trim() === " "){
        throw new ApiError(400, "Invalid User Input")
    }

    const findUser = await User.findOne({ email : email})
    if(!findUser){
        throw new ApiError(400, "No User Found")
    }

    const { otp, otpExpiry } = generateOtp();
    findUser.otp = otp;
    findUser.otpExpiry = otpExpiry;
    await findUser.save()

    console.log("otp saved in db")

    const htmlContent = sendEmailOtpTemplate(findUser.name, otp)
    const subject = "Forgot Email Assistance with OTP" 

    const sendEmail = await sendDynamicEmail(findUser.email, subject, htmlContent)
    console.log("Mail seneded")

    if(!sendEmail){
        throw new ApiError(500, "Internal Server Error")
    }

    return res.status(200).json(200, [], "Otp sent to your email")
})


export {
    register,
    login,
    emailResetPassword
}