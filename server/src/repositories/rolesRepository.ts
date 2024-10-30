import {IcreateActions, IupdateActions, IreadActions} from '../interfaces/CRUDinterface.js'
import {PrismaClient, Roles} from '@prisma/client'

class RolesRepository implements IcreateActions<Roles>, IupdateActions<Roles>, IreadActions<Roles>{
    private prisma:PrismaClient
    constructor(){
        this.prisma = new PrismaClient
    }

    public async findAll(): Promise<{ idRol: string; rol: string }[]> {
        const roles = await this.prisma.roles.findMany()
        return roles
    }

    public async findOne(idRolol: string): Promise<{ idRol: string; rol: string; } | null> {
        const rolUnique = this.prisma.roles.findUnique({
            where:{ idRol:idRolol }
        })
        return rolUnique
    }

    public async create(item: { idRol:string, rol: string; }): Promise<{ idRol: string; rol: string; }> {
        const newRole = this.prisma.roles.create({
            data:{
                idRol: item.idRol,
                rol: item.rol
            }
        })

        return newRole
    }

    public async delete(id: string): Promise<{ idRol: string; rol: string; } | null> {
        const deleteRol = await this.prisma.roles.delete({
            where:{
                idRol:id
            }
        })

        return deleteRol
    }

   public async update(id: string, items: { rol: string; }): Promise<{ idRol: string; rol: string; }> {
       const updateRol = await this.prisma.roles.update({
        where:{
            idRol:id
        },
        data:{
            rol: items.rol
        }
       })
       return updateRol
   }

}


export default RolesRepository