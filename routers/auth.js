import argon2  from "argon2"
import { User } from "../models/user.js"
import express from "express"
import Joi  from "joi"

const router = express.Router()
router.post("/",async(req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.message)

    let user = await User.findOne({email:req.body.email})   
    if(!user) return res.status(400).send("invalid email.")
    const password = await argon2.verify(user.password,req.body.password)
    if(!password) return res.status(400).send("incorrect password") 
    
    res.send("authentication successfully done...")        
})
function validate(user){
    const schema = Joi.object({
        email : Joi.string().min(2).max(50).email().required(),
        password : Joi.string().min(2).max(50).required()
    })
    return schema.validate(user)
}
export {router as auth}