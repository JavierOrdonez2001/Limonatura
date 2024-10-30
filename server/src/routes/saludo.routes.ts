import {Router} from 'express'
import SaludoController from '../controller/saludoController.js'



class SaludoRoutes{
    public router:Router

    constructor(private saludoController:SaludoController){
        this.router = Router()
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.get('/get/saludo', (req, res) => this.saludoController.getSaludo(req,res))
    }
}

export default SaludoRoutes

