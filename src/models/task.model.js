import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["pending", "completed", "done"], // Define the allowed values
        default: "pending", // Set the default value
    },
    description : {
        type : String,
        required: true
    }
}, {timestamps: true})

export const Task = mongoose.model("Task", taskSchema)