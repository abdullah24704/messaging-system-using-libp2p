import { error } from '../middleware/error.js';
import { user } from "../routers/user.js"
import { auth } from "../routers/auth.js";
import { homepage } from '../routers/home_page.js';
import express from "express"
import cors from "cors"
import path from "path"

export function routers(app){
    app.use(cors())
    app.use(express.static(path.resolve("views")))
    app.set("view engine","pug")
    app.use(express.json())
    app.use("/",homepage)
    app.use("/user",user)
    app.use("/auth",auth)
    app.use(error)  
    
    app.get('/dashboard', (req, res) => {
        res.sendFile(path.resolve("./p2p.html")); 
    });
}