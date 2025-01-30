import express from 'express'
import errorHandler from './middleware/errorHandler.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import corsOptions from './security/cors.js'







const app = express()

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended : true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}))

import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"
import taskRouter from "./routes/task.routes.js"


app.use("/api/v1/user", userRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/task", taskRouter)


app.use(errorHandler)

export default app