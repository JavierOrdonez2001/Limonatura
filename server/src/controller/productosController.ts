import ProductosService from "../service/productosService.js";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
class ProductoController{
    constructor(private preductosService:ProductosService){}

    public async createProducto(req:Request, res:Response){
        try{
            const {tipo, descripcion, precio, stock, peso,id_carrito_fk} = req.body
            let item = {
                idProducto:uuidv4(),
                tipo:tipo,
                descripcion:descripcion,
                precio:precio,
                stock:stock,
                peso:peso,
                id_carrito_fk:id_carrito_fk
            }
            const newProducto = await this.preductosService.createProductos(item)
            res.status(200)
            res.json(newProducto)
        }catch(err){
            console.error('error al crear un usuario: ', err)
            res.status(404).json({message:"error al crear un usuario"})
        }
    }

    public async getProductos(req:Request, res:Response){
        try{
            const productos = await this.preductosService.getProductos()
            res.status(200)
            res.json(productos)
        }catch(err){
            console.error('error al obtener los productos: ', err)
            res.status(404).json({message:"error al obtener los productos"})
        }
    }

    public async getProductoById(req:Request, res:Response){
        try{
            const id = req.params.id
            const getProductoById = await this.preductosService.getProductosById(id)
            res.status(200)
            res.json(getProductoById)
        }catch(err){
            console.error('error al obtener un producto: ', err)
            res.status(404).json({message:"error al obtener un producto"})         
        }
    }

    public async updateProducto(req:Request, res:Response){
        try{
            const id = req.params.id
            const {tipo, descripcion, precio, stock, peso, id_carrito_fk} = req.body
            let item = {
                idProducto:id,
                tipo:tipo,
                descripcion:descripcion,
                precio:precio,
                stock:stock,
                peso:peso,
                id_carrito_fk:id_carrito_fk
            }
            const updatedProducto = await this.preductosService.updateProductos(id,item)
            res.status(200)
            res.json(updatedProducto)
        }catch(err){
            console.error('error al actualizar un producto: ', err)
            res.status(404).json({message:"error al actualizar un producto"})         
        }
    }

    public async deleteProductos(req:Request, res:Response){
        try{
           const id  = req.params.id
           const deletedProducto = await this.preductosService.deleteProductos(id)
           res.status(200)
           res.json(deletedProducto)
        }catch(err){
            console.error('error al obtener un producto: ', err)
            res.status(404).json({message:"error al actualizar un producto"})         
        }
    }
}

export default ProductoController