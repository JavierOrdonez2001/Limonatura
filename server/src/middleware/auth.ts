import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { jwtPayload } from "../interfaces/authInterface.js";
import {PrismaClient} from "@prisma/client"


class Auth{
   private prisma:PrismaClient
    constructor(){
        this.prisma = new PrismaClient
    }


    public verifyToken(req:Request, res:Response, next:NextFunction){
        const authHeader = req.headers.authorization
        if(!authHeader) res.status(404).json({message:"token not found"}) 

        const token = authHeader
        
        try{
            const secretKey = process.env.SECRET_KEY
            const payload = jwt.verify(token!, secretKey!)
            req.user = payload
            next()
        }catch(err){
            res.status(400).json({message:"invalid token"})
        }
    }

    public async isAdministrador(req:Request, res:Response, next:NextFunction){

        const payload = req.user as jwtPayload
        const user = await this.prisma.usuarios.findUnique({
                where:{
                    idUsuario:payload.idUser
                },
                include:{
                    rol:true
            }
        })
        const equal  = user?.rol.rol === "administrador"
        if(equal === false){
            res.status(403).json({message:"usted no tiene permisos"});
            return;
        }
        next()  
    
              
    }
}


export default Auth