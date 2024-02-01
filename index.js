import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"

dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongo db")
}).catch((err)=>{
    console.log(err)
})

const app=express()

app.use("/api/user",userRouter)

const PORT=3000 
app.listen(PORT,()=>{
    console.log(`server is runnung on http://localhost:${PORT}`)
})