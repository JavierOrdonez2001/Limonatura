import e, {Request, Response} from "express"
import UsuariosService from "../service/usuariosService.js"
import {v4 as uuidv4} from "uuid"
import bcrypt from 'bcryptjs';

class UsuarioController{
    constructor(private usuarioService:UsuariosService){}

    public async createUsuario(req:Request, res:Response){
        try{
            const {nombre, rut, email, password, telefono, id_rol_fk, id_direccion_fk } = req.body
            const hashedPassword = await bcrypt.hash(password,10)
            let item = {
                idUsuario:uuidv4(),
                nombre:nombre,
                rut:rut,
                email:email,
                password:hashedPassword,
                telefono:telefono,
                id_rol_fk:id_rol_fk,
                id_direccion_fk:id_direccion_fk
            }
            const newUser = await this.usuarioService.createUsuarios(item)
            res.status(200)
            res.json(newUser)
        }catch(err){
            console.error('error al crear un usuario: ', err)
            res.status(404).json({message:"error al crear un usuario"})
        }
    }

    public async getUsuarios(req:Request, res:Response){
        try{
            const usuarios = await this.usuarioService.getUsuarios()
            res.status(200)
            res.json(usuarios)
        }catch(err){
            console.error('error al obtener usuarios: ', err)
            res.status(404).json({message:'error al obtener usuarios'})
        }
    }

    public async getUsuarioById(req:Request, res:Response){
        try{
            const id = req.params.id
            const usuarioById = await this.usuarioService.getUsuariosById(id)
            res.status(200)
            res.json(usuarioById)
        }catch(err){
            console.error('error al obtener un usuario: ',err)
            res.status(404).json({message:"error al obtener un usuario"})
        }
    }

    public async updateUsuario(req:Request, res:Response){
        try{
            const id = req.params.id
            const {nombre, rut, email, password, telefono, id_rol_fk, id_direccion_fk } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
            let item = {
                idUsuario:id,
                nombre:nombre,
                rut:rut,
                email:email,
                password:hashedPassword,
                telefono:telefono,
                id_rol_fk:id_rol_fk,
                id_direccion_fk:id_direccion_fk
            }
            const updatedUsuario = await this.usuarioService.updateUsuarios(id, item) 
            res.status(200)
            res.json(updatedUsuario)
        }catch(err){
            console.error('error al actualizar un usuario: ', err)
            res.status(404).json({message:'error al actulizar un usuario'})
        }
    }

    public async deleteUsuario(req:Request, res:Response){
        try{
            const id = req.params.id
            const deletedUsuario = await this.usuarioService.deleteUsuarios(id)
            res.status(200)
            res.json(deletedUsuario)
        }catch(err){
            console.error('error al eliminar un usuario: ', err)
            res.send(404).json({message:'error al eliminar un usuario'})
        }
    }

    public async showAllUser(req:Request,res:Response){
        try{
            const id = req.params.id
            const getUser = await this.usuarioService.showAllUser(id)
            res.json(getUser)
            res.status(200)
        }catch(err){
            console.error("Error al obtener el usuario: ", err)
            res.status(404).json({message:"error al obtener el usuario"})
        }
    }
}

export default UsuarioController