import {IcreateActions,IreadActions,IupdateActions} from "../interfaces/CRUDinterface.js"
import {IshowAllUser, IloginUser} from "../interfaces/usuarioInterface.js"
import {Usuarios} from "@prisma/client"

class UsuariosService{
    constructor(
        private readRepo: IreadActions<Usuarios>,
        private createRepo: IcreateActions<Usuarios>,
        private updateRepo: IupdateActions<Usuarios>,
        private showAllUserRepo: IshowAllUser<Usuarios>,
        private loginUser: IloginUser<Usuarios>
    ){}

    public async createUsuarios(item:Usuarios){
        return this.createRepo.create(item)
    }

    public async getUsuarios(){
       return this.readRepo.findAll()
    }

    public async getUsuariosById(id:string){
        return this.readRepo.findOne(id)
    }

    public async updateUsuarios(id:string, item:Usuarios){
        return this.updateRepo.update(id,item)
    }

    public async deleteUsuarios(id:string){
      return this.updateRepo.delete(id)
    }

    public async showAllUser(id:string){
        return this.showAllUserRepo.showAllUser(id)
    }

    public async login(email:string, password:string){
        return this.loginUser.login(email, password)
    }
}
 
export default UsuariosService