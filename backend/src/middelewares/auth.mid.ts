/*responsible for checking authentication of the 
user when we do req on api that is necessary for the user to be authenticated*/
/** middleware is just a funct that gets req res and next */

import { verify } from "jsonwebtoken";

export default (req:any,res:any,next:any)=>{
//get token from headers
//access token is the name that we choose that we set it in an interceptor on the client side 
const token=req.headers.access_token as string; 
//unauthorized:401
if(!token) return res.status(401).send();
//if there is no token the user is unauthorized
try {
    
    //if its valid it will return decoded token value
    const decodedUser=verify(token,process.env.JWT_SECRET!)
    req.user=decodedUser
    
} catch (error) {
    console.log("j ss dans catch")
    res.status(401).send()
}

return next()
}
