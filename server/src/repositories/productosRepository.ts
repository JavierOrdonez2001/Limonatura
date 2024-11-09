import { Decimal } from "@prisma/client/runtime/library.js"
import {IcreateActions,IreadActions,IupdateActions} from "../interfaces/CRUDinterface.js"
import { PrismaClient, Productos } from "@prisma/client"

class ProductosRepository implements IcreateActions<Productos>, IreadActions<Productos>, IupdateActions<Productos>{
    private prisma:PrismaClient
    constructor(){
        this.prisma = new PrismaClient
    }

    public async create(item: { idProducto: string;  tipo: string; descripcion: string; precio: Decimal; stock: number; peso: number | null;  }): Promise<{ idProducto: string;  tipo: string; descripcion: string; precio: Decimal; stock: number; peso:number | null; }> {
        const newProducto = await this.prisma.productos.create({
            data:{
                idProducto:item.idProducto,
                tipo:item.tipo,
                descripcion:item.descripcion,
                precio:item.precio,
                stock:item.stock,
                peso:item.peso,
            }            
        })
        return newProducto
    }

    public async findAll(): Promise<{ idProducto: string;  tipo: string; descripcion: string; precio: Decimal; stock: number; peso: number | null; }[]> {
        const productos = await this.prisma.productos.findMany()
        return productos
    }

    public async findOne(id: string): Promise<{ idProducto: string;  tipo: string; descripcion: string; precio: Decimal; stock: number; peso: number | null;  } | null> {
        const productoById = await this.prisma.productos.findUnique({
            where:{
                idProducto:id
            }
        })
        return productoById
    }

    public async delete(id: string): Promise<{ idProducto: string;  tipo: string; descripcion: string; precio: Decimal; stock: number; peso: number | null; } | null> {
        const deletedProducto = await this.prisma.productos.delete({
            where:{
                idProducto:id
            }
        })
        return deletedProducto
    }

    public async update(id: string, items: { idProducto: string;  tipo: string; descripcion: string; precio: Decimal; stock: number; peso: number | null;  }): Promise<{ idProducto: string;  tipo: string; descripcion: string; precio: Decimal; stock: number; peso: number | null; }> {
        const updatedProducto = await this.prisma.productos.update({
            where:{
                idProducto:id
            },
            data:{
                idProducto:items.idProducto,
                tipo:items.tipo,
                descripcion:items.descripcion,
                precio:items.precio,
                stock:items.stock,
                peso:items.peso,
            }
        })
        return updatedProducto
    }
}

export default ProductosRepository