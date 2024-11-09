import {IcreateActions,IreadActions,IupdateActions} from "../interfaces/CRUDinterface.js"
import {Productos} from "@prisma/client"


class ProductosService{
    constructor(
        private createRepo: IcreateActions<Productos>,
        private readRepo: IreadActions<Productos>,
        private updateRepo: IupdateActions<Productos>
    ){}
    
    public async createProductos(item:Productos){
        return this.createRepo.create(item)
    }

    public async getProductos(){
       return this.readRepo.findAll()
    }

    public async getProductosById(id:string){
        return this.readRepo.findOne(id)
    }

    public async updateProductos(id:string, item:Productos){
        return this.updateRepo.update(id,item)
    }

    public async deleteProductos(id:string){
      return this.updateRepo.delete(id)
    }
} 

export default ProductosService