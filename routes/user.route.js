import express from "express"
import { testUser } from "../controller/user.controller.js"

const router=express.Router()
router.get("/",testUser)
export default router