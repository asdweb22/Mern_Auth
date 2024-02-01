import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const Signup = async(req,res,next)=>{
    try {
        const {username,email,password}=req.body
        const hashedPass=bcryptjs.hashSync(password,10)
        const newUser=new User({username,email,password:hashedPass})
        await newUser.save()
        res.status(201).send({success:true,message:"New User created successfully",newUser})
    
    } catch (error) {
        next(error)
    }
}