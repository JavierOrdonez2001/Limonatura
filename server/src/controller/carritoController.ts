import {Request, Response} from "express"
import CarritoService from "../service/carritoService.js"
import {v4 as uuidv4} from "uuid"

class CarritoController{
    constructor(private carritoService:CarritoService){}

    public async createCarrito(req:Request, res:Response){
        try{
            const {id_usuario_fk, id_producto_fk} = req.body
            let item = {
                idCarrito:uuidv4(),
                id_usuario_fk:id_usuario_fk,
                id_producto_fk:id_producto_fk
            }
            const newCarrito = await this.carritoService.createCarrito(item)
            res.status(200)
            res.json(newCarrito)
        }catch(err){
            console.error('error al crear un carrito: ', err)
            res.status(404).json({message:"error al crear un carrito"})
        }
    }

    public async getCarrito(req:Request, res:Response){
        try{
            const carritos = await this.carritoService.getCarrito()
            res.status(200)
            res.json(carritos)
        }catch(err){
            console.error('error al obtener los carritos: ', err)
            res.status(404).json({message:"error al obtener los carritos"})
        }
    }

    public async getCarritoById(req:Request, res:Response){
        try{
            const id  = req.params.id
            const carritoById = await this.carritoService.getCarritoById(id)
            res.status(200)
            res.json(carritoById)
        }catch(err){
            console.error('error al obtener un carrito: ', err)
            res.status(404).json({message:'error al obtener un carrito'})
        }
    }

    public async deleteCarrito(req:Request, res:Response){
        try{
            const id = req.params.id
            const deletedCarrito = await this.carritoService.deleteCarrito(id)
            res.status(200)
            res.json(deletedCarrito)
        }catch(err){
            console.error('error al eliminar un carrito: ', err)
            res.status(404).json({message:"error al obtener un carrito"})
        }
    }

    public async updateCarrito(req:Request, res:Response){
        try{
            const id = req.params.id
            const {id_usuario_fk,id_producto_fk} = req.body
            let item = {
                idCarrito:id,
                id_usuario_fk:id_usuario_fk,
                id_producto_fk:id_producto_fk
            }

            const updateCarrito = await this.carritoService.updateCarrito(id, item)
            res.json(updateCarrito)
            res.status(200)
        }catch(err){
            console.error("error al actualizar carrito: ", err)
            res.status(404).json({message:"error al actualizar carrito"})
        }
    }


}

export default CarritoController