import {IcreateActions,IreadActions,IupdateActions} from "../interfaces/CRUDinterface.js"
import {PrismaClient, Carrito} from "@prisma/client"

class CarritoRepository implements IcreateActions<Carrito>, IreadActions<Carrito>, IupdateActions<Carrito>{
    private prisma:PrismaClient;
    constructor(){
        this.prisma = new PrismaClient
    }

    public async create(item: { idCarrito: string; id_usuario_fk: string; id_producto_fk: string; }): Promise<{ idCarrito: string; id_usuario_fk: string; id_producto_fk: string | null; }> {
        const newCarrito = await this.prisma.carrito.create({
            data:{
                idCarrito:item.idCarrito,
                id_usuario_fk:item.id_usuario_fk,
                id_producto_fk:item.id_producto_fk 
            }
        })
        return newCarrito
    }

    public async findAll(): Promise<{ idCarrito: string; id_usuario_fk: string;  id_producto_fk: string | null;}[]> {
        const carritos = await this.prisma.carrito.findMany()
        return carritos
    }

    public async findOne(id: string): Promise<{ idCarrito: string; id_usuario_fk: string; id_producto_fk: string | null; } | null> {
        const carritoById = await this.prisma.carrito.findUnique({
            where:{
                idCarrito:id
            },
            include:{
                usuario:true,
                producto:true
            }
        })
        return carritoById
    }

    public async delete(id: string): Promise<{ idCarrito: string; id_usuario_fk: string; id_producto_fk: string | null; } | null> {
        const deleteCarrito = await this.prisma.carrito.delete({
            where:{
                idCarrito:id
            }
        })
        return deleteCarrito
    }

    public async update(id: string, items: { idCarrito: string; id_usuario_fk: string; id_producto_fk: string; }): Promise<{ idCarrito: string; id_usuario_fk: string; id_producto_fk: string | null; }> {
        const updatedCarrito = await this.prisma.carrito.update({
            where:{
                idCarrito:id
            },
            data:{
                idCarrito:items.idCarrito,
                id_usuario_fk:items.id_usuario_fk,
                id_producto_fk:items.id_producto_fk
            }
        })
        return updatedCarrito
    }
}
 
export default CarritoRepository