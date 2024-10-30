import {IcreateActions,IreadActions,IupdateActions} from "../interfaces/CRUDinterface.js"
import { Direcciones } from "@prisma/client"


class DireccionesServices{

    constructor(
        private readRepo:IreadActions<Direcciones>,
        private createRepo:IcreateActions<Direcciones>,
        private updateRepo:IupdateActions<Direcciones>
    ){}

    public async createDirecciones(item:Direcciones){
        return this.createRepo.create(item)
    }

    public async getDirecciones(){
       return this.readRepo.findAll()
    }

    public async getDireccioneseById(id:string){
        return this.readRepo.findOne(id)
    }

    public async updateDirecciones(id:string, item:Direcciones){
        return this.updateRepo.update(id,item)
    }

    public async deleteDirecciones(id:string){
      return this.updateRepo.delete(id)
    }
}


export default DireccionesServices