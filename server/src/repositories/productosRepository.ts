import { Decimal } from "@prisma/client/runtime/library.js"
import {IcreateActions,IreadActions,IupdateActions} from "../interfaces/CRUDinterface.js"
import { PrismaClient, Productos } from "@prisma/client"

class ProductosRepository implements IcreateActions<Productos>, IreadActions<Productos>, IupdateActions<Productos>{
    private prisma:PrismaClient
    constructor(){
        this.prisma = new PrismaClient
    }

    public async create(item: { idProducto: string; numero_producto: string; tipo: string; descripcion: string; precio: Decimal; stock: number; peso_kg: number | null; id_carrito_fk: string | null }): Promise<{ idProducto: string; numero_producto: string; tipo: string; descripcion: string; precio: Decimal; stock: number; peso_kg: number | null; id_carrito_fk: string | null }> {
        const newProducto = await this.prisma.productos.create({
            data:{
                idProducto:item.idProducto,
                numero_producto:item.numero_producto,
                tipo:item.tipo,
                descripcion:item.descripcion,
                precio:item.precio,
                stock:item.stock,
                peso_kg:item.peso_kg,
                id_carrito_fk:item.id_carrito_fk
            }            
        })
        return newProducto
    }

    public async findAll(): Promise<{ idProducto: string; numero_producto: string; tipo: string; descripcion: string; precio: Decimal; stock: number; peso_kg: number | null; id_carrito_fk: string | null }[]> {
        const productos = await this.prisma.productos.findMany()
        return productos
    }

    public async findOne(id: string): Promise<{ idProducto: string; numero_producto: string; tipo: string; descripcion: string; precio: Decimal; stock: number; peso_kg: number | null; id_carrito_fk: string | null } | null> {
        const productoById = await this.prisma.productos.findUnique({
            where:{
                idProducto:id
            }
        })
        return productoById
    }

    public async delete(id: string): Promise<{ idProducto: string; numero_producto: string; tipo: string; descripcion: string; precio: Decimal; stock: number; peso_kg: number | null; id_carrito_fk: string | null } | null> {
        const deletedProducto = await this.prisma.productos.delete({
            where:{
                idProducto:id
            }
        })
        return deletedProducto
    }

    public async update(id: string, items: { idProducto: string; numero_producto: string; tipo: string; descripcion: string; precio: Decimal; stock: number; peso_kg: number | null; id_carrito_fk: string | null }): Promise<{ idProducto: string; numero_producto: string; tipo: string; descripcion: string; precio: Decimal; stock: number; peso_kg: number | null; id_carrito_fk: string | null }> {
        const updatedProducto = await this.prisma.productos.update({
            where:{
                idProducto:id
            },
            data:{
                idProducto:items.idProducto,
                numero_producto:items.numero_producto,
                tipo:items.tipo,
                descripcion:items.descripcion,
                precio:items.precio,
                stock:items.stock,
                peso_kg:items.peso_kg,
                id_carrito_fk:items.id_carrito_fk
            }
        })
        return updatedProducto
    }
}

export default ProductosRepository