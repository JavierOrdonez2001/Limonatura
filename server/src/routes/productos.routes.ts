import ProductoController from "../controller/productosController.js";
import { Router } from "express";

class ProductoRouter{
    public router:Router
    constructor(private productoController:ProductoController){
        this.router = Router()
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.get('/productos/get/all', (req, res) => this.productoController.getProductos(req, res))
        this.router.get('/preductos/get/byId/:id', (req, res) => this.productoController.getProductoById(req, res))
        this.router.post('/productos/post/create', (req, res) => this.productoController.createProducto(req, res))
        this.router.delete('/productos/delete/:id', (req, res) => this.productoController.deleteProductos(req, res))
        this.router.put('/productos/update/:id', (req, res) => this.productoController.updateProducto(req, res))
    }
}

export default ProductoRouter