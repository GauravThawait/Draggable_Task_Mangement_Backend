import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createTask = asyncHandler(async(req, res) => {

    const {description} = req.body

    if(description === undefined || description === null || description.trim() === ""){
        throw new ApiError(400, "Description is required")
    }

    const data = await Task.create({
        description: description,
        user : req.user._id
    })
    console.log("data : ", data)
    if(!data){
        throw new ApiError(500, "Something while wrong creating task")
    }

    console.log("task creation api successfull")
    return res.status(200).json( new ApiResponse(200, data, "Task Created Successfully"))
})

const taskUpdate = asyncHandler(async (req, res) => {

    const { Id, status } = req.body;

    if ([Id, status].some((item) => item === undefined || item === null || item.trim() === "")) {
        throw new ApiError(400, "Invalid request");
    }

    const validStatuses = ["pending", "done", "completed"];
    if (!validStatuses.includes(status)) {
        throw new ApiError(400, "Invalid status of task");
    }

    const validTask = await Task.findById(Id);

    if (!validTask) {
        throw new ApiError(404, "No task found with the given ID");
    }

    const updatedTask = await Task.findByIdAndUpdate(
        Id,
        { status: status },
        { new: true } // Return the updated document
    );

    if (!updatedTask) {
        throw new ApiError(500, "Failed to update task");
    }

    return res.status(200).json(new ApiResponse(200, updatedTask, "Task status updated successfully"));
});



const getAllTask = asyncHandler( async(req, res) => {
    
    const userId = req.user._id

    if(userId === undefined || userId === null || userId.trim() === " "){
        throw new ApiError(400, "Invalid request")
    }


    const data = await Task.find({ user: userId });

    if(!data || data.length === 0){
        throw new ApiError(500, "No Task Found")
    }

    return res.status(200).json(new ApiResponse(200, data, "Task found successfullt"))
})

const deleteTask = asyncHandler(async(req, res) => {
    console.log("Delete task api hitted")
    const { Id } = req.body
    console.log("Delete Task api hitted :", Id)

    if(Id === undefined || Id === null || Id.trim() === " "){
        throw new ApiError(400, "Invalid Task Id")
    }

    const findTask = await Task.findById(Id)

    if(!findTask){
        throw new ApiError(400, "No Task Found")
    }

    const userId = req.user._id


    if(findTask.user.toString() !== userId.toString()){
        throw new ApiError(403, "Invalid access to content")
    }

    const result = await Task.findByIdAndDelete(Id)


    if(!result){
        throw new ApiError(500, "Internal Server Error")
    }
    
    return res.status(200).json(200, [], "Task Deleted Successfully")
})


export{
    createTask,
    taskUpdate,
    getAllTask,
    deleteTask
}