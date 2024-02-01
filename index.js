import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongo db")
}).catch((err)=>{
    console.log(err)
})

const app=express()
app.use(express.json())

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "internal server error";
    return res.status(statusCode).json({
        success:false,
        error:message,
        statusCode:statusCode
    })
})

const PORT=3000 
app.listen(PORT,()=>{
    console.log(`server is runnung on http://localhost:${PORT}`)
})

