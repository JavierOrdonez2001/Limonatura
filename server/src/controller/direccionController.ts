import DireccionesServices from "../service/direccionesService.js"
import {Request, Response} from "express"
import { v4 as uuidv4} from "uuid"


class DireccionesController{
    constructor(private direccionService: DireccionesServices){}

    public async getDirecciones(req:Request, res:Response){
        try{
            const getDirecciones = await this.direccionService.getDirecciones()
            res.json(getDirecciones)
            res.status(200)
        }catch(err){
            console.error('error al obtener direcciones: ', err)
            res.status(404).json({message:"error al obtener direcciones"})
        }
    }

    public async getDireccionById(req:Request, res:Response){
        try{
            const id = req.params.id
            const getDireccionById = await this.direccionService.getDireccioneseById(id)
            res.json(getDireccionById)
            res.status(200)
        }catch(err){
            console.error("Error al obtener una direccion: ", err)
            res.status(404).json({message:"error al obtener una direccion"})
        }
    }

    public async createDireccion(req:Request, res:Response){
        try{
            const {pais, ciudad, comuna, calle, numero} = req.body

            let item = {
                idDirecciones:uuidv4(),
                pais:pais,
                ciudad:ciudad,
                comuna:comuna,
                calle:calle,
                numero:numero
            }

            const direccion = await this.direccionService.createDirecciones(item)
            res.json(direccion)
            res.status(200)
        }catch(err){
            console.error("error al crear una direccion: ", err)
            res.status(404).json({message:"error al crear una direccion"})
        }
    }

    public async deleteDireccion(req:Request, res:Response){
        try{
            const id = req.params.id
            const deletedDireccion = await this.direccionService.deleteDirecciones(id)
            res.json(deletedDireccion)
            res.status(200)
        }catch(err){
            console.error('error al eliminar una direccion: ', err)
            res.status(404).json({message:"error al eliminar una direccion"})
        }
    }

    public async updateDireccion(req:Request, res:Response){
        try{
            
            const id = req.params.id
            const {pais, ciudad, comuna, calle, numero} = req.body
            let item = {
                idDirecciones:id,
                pais:pais,
                ciudad:ciudad, 
                comuna:comuna,
                calle:calle,
                numero:numero
            }
            
            const updatedDireccion = await this.direccionService.updateDirecciones(id, item)
            res.json(updatedDireccion)
            res.status(200)
                            
        }catch(err){
            console.error('error al actualizar una direccion')
            res.status(404).json({message:"error al actualizar una direccion"})         
        }
    }
}


export default DireccionesController
