import {IcreateActions,IreadActions,IupdateActions} from "../interfaces/CRUDinterface.js"
import {Carrito} from "@prisma/client"


class CarritoService{
    constructor(
        private readRepo:IreadActions<Carrito>,
        private createRepo: IcreateActions<Carrito>,
        private updateRepo: IupdateActions<Carrito>
    ){}

    public async createCarrito(item:Carrito){
        return this.createRepo.create(item)
    }

    public async getCarrito(){
       return this.readRepo.findAll()
    }

    public async getCarritoById(id:string){
        return this.readRepo.findOne(id)
    }

    public async updateCarrito(id:string, item:Carrito){
        return this.updateRepo.update(id,item)
    }

    public async deleteCarrito(id:string){
      return this.updateRepo.delete(id)
    }
}

export default CarritoService