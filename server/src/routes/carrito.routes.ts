import CarritoController from "../controller/carritoController.js";
import { Router } from "express";


class CarritoRouter{
    public router:Router
    constructor(private carritoController:CarritoController){
        this.router = Router()
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.post('/carrito/post/create', (req, res) => this.carritoController.createCarrito(req, res))
        this.router.get('/carrito/get/all', (req, res) => this.carritoController.getCarrito(req, res))
        this.router.get('/carrito/get/byId/:id', (req, res) => this.carritoController.getCarritoById(req, res))
        this.router.delete('/carrito/delete/:id', (req, res) => this.carritoController.deleteCarrito(req, res))
        this.router.put('/carrito/put/update/:id', (req, res) => this.carritoController.updateCarrito(req, res))
    }
}

export default CarritoRouter