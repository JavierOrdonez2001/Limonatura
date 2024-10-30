import { IreadActions, IcreateActions, IupdateActions } from "../interfaces/CRUDinterface.js";
import { Roles } from "@prisma/client";


class RolesService{


    constructor(
        private readRepo: IreadActions<Roles>,
        private createRepo: IcreateActions<Roles>,
        private updateRepo: IupdateActions<Roles>
    ){} 

    public async createRole(item:Roles){
        return this.createRepo.create(item)
    }

    public async getRole(){
        return this.readRepo.findAll()
    }

    public async getRoleById(idRol:string){
        return this.readRepo.findOne(idRol)
    }

    public async updateRole(id:string, item:Roles){
        return this.updateRepo.update(id, item)
    }

    public async deleteRole(id:string){
        return this.updateRepo.delete(id)
    }
}


export default RolesService