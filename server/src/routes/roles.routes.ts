import { Router} from "express"
import RolesController from "../controller/rolesController.js"

class RolesRoutes{
    public router:Router

    constructor(private rolesController: RolesController){
        this.router = Router()
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.get('/roles/get/all', (req, res) => this.rolesController.getRoles(req, res))
        this.router.get('/roles/get/byId/:id', (req, res) => this.rolesController.getRolById(req, res))
        this.router.post('/roles/post/create', (req, res) => this.rolesController.createRol(req, res))
        this.router.delete('/roles/delete/byId/:id', (req, res) => this.rolesController.deleteRol(req, res))
        this.router.put('/roles/put/byId/:id', (req, res) => this.rolesController.updateRol(req, res))
    }
}

export default RolesRoutes