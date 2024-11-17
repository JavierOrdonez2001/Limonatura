import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";



class Auth{
    constructor(){}


    public verifyToken(req:Request, res:Response, next:NextFunction){
        const authHeader = req.headers.authorization
        if(!authHeader) res.status(404).json({message:"token not found"}) 

        const token = authHeader
        
        try{
            const secretKey = process.env.SECRET_KEY
            const payload = jwt.verify(token!, secretKey!)
            console.log(payload)
            next()
        }catch(err){
            res.status(400).json({message:"invalid token"})
        }
    }
}


export default Auth