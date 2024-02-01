import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const Signup = async(req,res)=>{
    try {
        const {username,email,password}=req.body
        const hashedPass=bcryptjs.hashSync(password,10)
        const newUser=new User({username,email,password:hashedPass})
        await newUser.save()
        res.status(201).send({message:"New User created successfully"})
    
    } catch (error) {
        res.status(500).json(error.message)
    }
}