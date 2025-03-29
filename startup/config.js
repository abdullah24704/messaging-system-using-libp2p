import config from "config"

export function _config(app) {
   if(!config.get("jwtPrivateKey")){
       throw new Error("Fatal error: jwt key is not define ")      
    }
}
