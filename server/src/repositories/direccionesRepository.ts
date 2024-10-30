import {IcreateActions,IreadActions,IupdateActions} from "../interfaces/CRUDinterface.js"
import { PrismaClient, Direcciones } from "@prisma/client"



class DireccionesRepository implements IcreateActions<Direcciones>, IreadActions<Direcciones>, IupdateActions<Direcciones>{
    private prisma:PrismaClient
    constructor(){
        this.prisma = new PrismaClient
    }

    public async create(item: { idDirecciones: string; pais: string; ciudad: string; comuna: string; calle: string; numero: string; id_usuario_direccion_fk: string }): Promise<{ idDirecciones: string; pais: string; ciudad: string; comuna: string; calle: string; numero: string;}> {
        const newDirections = await this.prisma.direcciones.create({
            data:{
                idDirecciones:item.idDirecciones,
                pais:item.pais,
                ciudad:item.ciudad,
                comuna:item.comuna,
                calle:item.calle,
                numero:item.numero,
            }
        })
        return newDirections
    }

    public async findAll(): Promise<{ idDirecciones: string; pais: string; ciudad: string; comuna: string; calle: string; numero: string; }[]> {
        const direcciones = await this.prisma.direcciones.findMany()
        return direcciones
    }

    public async findOne(id: string): Promise<{ idDirecciones: string; pais: string; ciudad: string; comuna: string; calle: string; numero: string; } | null> {
        const direccionById = await this.prisma.direcciones.findUnique({
            where:{
                idDirecciones:id
            }
        })
        return direccionById
    }

    public async delete(id: string): Promise<{ idDirecciones: string; pais: string; ciudad: string; comuna: string; calle: string; numero: string;  } | null> {
        const deleteDireccion = await this.prisma.direcciones.delete({
            where:{
                idDirecciones:id
            }
        })
        return deleteDireccion


    }

    public async update(id: string, items: {pais: string; ciudad: string; comuna: string; calle: string; numero: string; }): Promise<{ idDirecciones: string; pais: string; ciudad: string; comuna: string; calle: string; numero: string; }> {
        const updatedDireccion = await this.prisma.direcciones.update({
            where:{
                idDirecciones:id
            },
            data:{
                pais:items.pais,
                ciudad:items.ciudad,
                comuna:items.comuna,
                calle:items.calle,
                numero:items.numero,
            }
        })

        return updatedDireccion
    }
}


export default DireccionesRepository