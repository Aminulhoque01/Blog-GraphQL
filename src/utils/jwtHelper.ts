import jwt from "jsonwebtoken"
require('dotenv').config();

export const jwtHelper = async(payload:{userId:number})=>{
    const token = jwt.sign(payload,"signature", {expiresIn:"1d"})
    return token;
}