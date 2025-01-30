import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from 'jsonwebtoken'
const auth = async(req, res, next) => {

    try {
        let token = req.headers.authorization
        
        if(!token){
            throw new ApiError(401, "Authentication token is missing")
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7).trim();
        }

        const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY)

        const validUser = await User.findById(decode._id)

        if(!validUser){
            throw new ApiError(403, "Invalid authentication token")
        }

        req.user = decode
        next()

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            next(new ApiError(401, "Invalid authentication token"));
        } else if (error.name === "TokenExpiredError") {
            next(new ApiError(401, "Authentication token has expired"));
        } else {
            next(new ApiError(500, "Authentication server error"));
        }
    }
}

export default auth