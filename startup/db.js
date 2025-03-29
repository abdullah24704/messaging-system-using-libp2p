import mongoose from "mongoose"
import logger from "./logging.js"
export function db(){ 
    mongoose.connect("mongodb://localhost/p2p")
    .catch((err)=> logger.error(err.message,err))
}