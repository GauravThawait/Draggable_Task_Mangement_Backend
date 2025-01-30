import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    otp: {
        type: String, // Store the generated OTP
    },
    otpExpiry: {
        type: Date, // Store the expiry time for the OTP
    }
})

userSchema.pre("save", async function(next) {

    if(!this.isModified("password")){
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateToken = function () {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { _id: this._id },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: '1d' },
        (err, token) => {
          if (err) return reject(err);
          resolve(token);
        }
      );
    });
  };
export const User = mongoose.model("User", userSchema)