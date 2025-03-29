import { validate,User } from "../models/user.js"
import express from "express"
import _ from "lodash"
import argon2  from "argon2"


const router = express.Router()
router.post("/",async(req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.message)

    let user = await User.findOne({email:req.body.email})   
    if(user) return res.status(400).send("user already exist")
    user = await User(_.pick(req.body,["username","email","password"])) 
    const hashedPassword = await argon2.hash(req.body.password)
    user.password = hashedPassword
    
    res.send(_.pick(user,["name","email"]))
    await user.save()

})
export {router as user}