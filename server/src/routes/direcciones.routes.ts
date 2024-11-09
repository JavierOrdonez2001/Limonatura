import { Router } from "express";
import DireccionesController from "../controller/direccionController.js";

class DireccionesRoutes{
    public router:Router

    constructor(private direccionesController:DireccionesController){
        this.router = Router()
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.get('/direcciones/get/all',(req, res) => this.direccionesController.getDirecciones(req, res))
        this.router.get('/direcciones/get/byId/:id', (req, res) => this.direccionesController.getDireccionById(req, res))
        this.router.post('/direcciones/post/create', (req, res) => this.direccionesController.createDireccion(req, res))
        this.router.put('/direcciones/put/update/:id', (req, res) => this.direccionesController.updateDireccion(req, res))
        this.router.delete('/direcciones/delete/deleteDireccion/:id', (req, res) => this.direccionesController.deleteDireccion(req, res))
    }
}


export default DireccionesRoutes