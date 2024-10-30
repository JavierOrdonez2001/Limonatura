import {IcreateActions,IreadActions,IupdateActions} from "../interfaces/CRUDinterface.js"
import { PrismaClient, Usuarios } from "@prisma/client"


class UsuariosRepository implements IcreateActions<Usuarios>, IreadActions<Usuarios>, IupdateActions<Usuarios>{
    private prisma:PrismaClient
    constructor(){
        this.prisma = new PrismaClient
    }

    public async findAll(): Promise<{ idUsuario: string; nombre: string; rut: string; email: string; password: string; telefono: string; id_rol_fk: string; id_direccion_fk: string }[]> {
        const usuarios = await this.prisma.usuarios.findMany()
        return usuarios
    }

    public async findOne(id: string): Promise<{ idUsuario: string; nombre: string; rut: string; email: string; password: string; telefono: string; id_rol_fk: string; id_direccion_fk: string; } | null> {
        const usuarioById = await this.prisma.usuarios.findUnique({
            where:{
                idUsuario:id
            }
        })
        return usuarioById
    }

    public async create(item: { idUsuario: string; nombre: string; rut: string; email: string; password: string; telefono: string; id_rol_fk: string; id_direccion_fk: string; }): Promise<{ idUsuario: string; nombre: string; rut: string; email: string; password: string; telefono: string; id_rol_fk: string; id_direccion_fk: string; }> {
        const newUsuario = await this.prisma.usuarios.create({
            data:{
                idUsuario:item.idUsuario,
                nombre:item.nombre,
                rut:item.rut,
                email:item.email,
                password:item.password,
                telefono:item.telefono,
                id_rol_fk:item.id_rol_fk,
                id_direccion_fk:item.id_direccion_fk
            }
        })
        return newUsuario
    }

    public async delete(id: string): Promise<{ idUsuario: string; nombre: string; rut: string; email: string; password: string; telefono: string; id_rol_fk: string; id_direccion_fk: string; } | null> {
        const deletedUsuario = await this.prisma.usuarios.delete({
            where:{
                idUsuario:id
            }
        })    
        return deletedUsuario
    }

    public async update(id: string, items: { idUsuario: string; nombre: string; rut: string; email: string; password: string; telefono: string; id_rol_fk: string; id_direccion_fk: string; }): Promise<{ idUsuario: string; nombre: string; rut: string; email: string; password: string; telefono: string; id_rol_fk: string; id_direccion_fk: string; }> {
        const updatedUsuario = await this.prisma.usuarios.update({
            where:{
                idUsuario:id
            },
            data:{
                idUsuario:items.idUsuario,
                nombre:items.nombre,
                rut:items.rut,
                email:items.email,
                password:items.password,
                telefono:items.telefono,
                id_rol_fk:items.id_rol_fk,
                id_direccion_fk:items.id_direccion_fk
            }
        })
        return updatedUsuario
    }
}



export default UsuariosRepository
