import RolesService from "../service/rolesService.js" 
import {Request, Response} from "express"
import { v4 as uuidv4 } from 'uuid';

class RolesController{
    
    constructor(private roleService:RolesService){}

    public async getRoles(req:Request, res:Response){
        try{
            const roles = await this.roleService.getRole()
            res.json(roles)
            res.status(200)
        }catch(err){
            console.error('error al obtener los roles:  ', err)
            res.status(404)
            res.json({message:"error al obtener los Roles"})
        }
    }

    public async getRolById(req:Request, res:Response){
        try{
            const id = req.params.id
            const getRolById = await this.roleService.getRoleById(id)
            res.status(200)
            res.json(getRolById)
        }catch(err){
            console.error('error al crear un usuario', err)
            res.status(404)
            res.json({message:"error al crear un usuario"})
        }
    }

    public async createRol(req:Request, res:Response){
        try{
            const { rol } = req.body
            let createRol = {
                idRol: uuidv4(),
                rol:rol
            } 
            const newRol = await this.roleService.createRole(createRol)
            res.status(200)
            res.json(newRol)
        }catch(err){
            console.error('Error al crear un usuario: ', err)
            res.status(404)
            res.json({message:'error al crear un usuario'})
        }
    }

    public async deleteRol(req:Request, res:Response){
        try{
            const id =  req.params.id
            const rolRemoved = await this.roleService.deleteRole(id)
            res.status(200)
            res.json(rolRemoved)
        }catch(err){
            console.error('error al eliminar un rol: ', err)
            res.status(404)
            res.json({message:"error al eliminar un rol"})
        }
    }

    public async updateRol(req:Request, res:Response){
        try{
            const id = req.params.id
            const { rol } = req.body
            const newRol = { 
                idRol:id,
                rol:rol
            }
            const rolUpdated = this.roleService.updateRole(id, newRol)
            res.status(200)
            res.json(rolUpdated)
        }catch(err){
            console.log('error al actualizar un rol: ', err)
            res.status(404)
            res.json({message:"error al actualizar un rol"})
        }
    }

}

export default RolesController