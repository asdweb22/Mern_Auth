import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const Signup = async(req,res)=>{
    try {
        const {username,email,password}=req.body
        const hashedPass=bcryptjs.hashSync(password,10)
        const newUser=new User({username,email,password:hashedPass})
        await newUser.save()
        res.status(201).send({success:true,message:"New User created successfully",newUser})
    
    } catch (error) {
        res.status(500).send({success:false,message:"Something wend wrong",error})
    }
}

export const Signin = async (req,res)=>{
    const {email,password}=req.body
    try {
       
        const userData=await User.findOne({email})
        if(!userData){
            return res.status(404).send({success:false,message:"User not found"})
        }
        
        const validpassword=bcryptjs.compareSync(password,userData.password)
        if(!validpassword){
            return res.status(401).send({success:false,message:"user credetials are invalid"})
        }
        const token=jwt.sign({id:userData._id},process.env.JWT_SECRET)
        const {password:hashedPass,...rest}=userData._doc
        const expiryDate=new Date(Date.now()+3600000)//1 hour
        res.cookie("access_token",token,{httpOnly:true,expires:expiryDate}).status(200).json(rest)

    } catch (error) {
        return res.status(400).send({success:false,error:error.message,message:"something went wrong"})
    }
}