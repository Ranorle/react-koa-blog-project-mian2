import express from "express"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import uploadRoutes from "./routes/upload.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from 'node:path'

const app =express()
app.use(cors())
app.use('/api',express.static(path.resolve('./img')))
app.use('/',express.static(path.resolve('./build')))

app.use(express.json())

app.use(cookieParser())


app.use("/api/upload",uploadRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

app.listen(80,()=>{
    console.log("connected!")
})