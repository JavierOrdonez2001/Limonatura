import { Router } from "express";
import UsuarioController from "../controller/usuariosController.js";
import Auth from "../middleware/auth.js";

class UsuarioRouter{
    public router:Router
    constructor(private usuarioController:UsuarioController, private auth:Auth){
        this.router = Router()
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.post('/usuarios/post/create', (req, res) => this.usuarioController.createUsuario(req, res))
        this.router.get('/usuarios/get/all', (req, res) => this.usuarioController.getUsuarios(req, res))
        this.router.get('/usuarios/get/byId/:id', (req, res) => this.usuarioController.getUsuarioById(req, res))
        this.router.put('/usuarios/put/:id', (req, res, next) => this.auth.verifyToken(req, res, next) ,(req, res) => this.usuarioController.updateUsuario(req, res))
        this.router.delete('/usuarios/delete/:id', (req, res, next) => this.auth.verifyToken(req, res, next) ,(req, res) => this.usuarioController.deleteUsuario(req,res))
        this.router.get('/usuarios/get/show/all/:id', (req, res) => this.usuarioController.showAllUser(req, res))
        this.router.post('/usuarios/login', (req, res) => this.usuarioController.login(req, res))
        
    }
}


export default UsuarioRouter