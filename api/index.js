import express from "express"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import uploadRoutes from "./routes/upload.js"
import uploadRoutes2 from "./routes/upload2.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from 'node:path'
import fs from 'fs'
const app =express()
app.use(cors())
app.use('/api',express.static(path.resolve('./img')))
app.use('/api',express.static(path.resolve('./img2')))
app.use('/',express.static(path.resolve('./build')))

app.use(express.json())

app.use(cookieParser())


app.use("/api/upload",uploadRoutes)
app.use("/api/upload2",uploadRoutes2)
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)


app.listen(8800,()=>{
    console.log("connected!")
})