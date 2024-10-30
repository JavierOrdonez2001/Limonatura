import{Request, Response} from 'express'
import SaludoService from '../service/saludoService.js'

class SaludoController{
    constructor(private saludoService:SaludoService){}

    public getSaludo(req:Request, res:Response){
        try{
            let message:string = req.body.message
            console.log(message)
            res.send('el mensaje deberia estar en la consola')
        }catch(err){
            console.error('error al saludar: ', err)
            res.status(401)
            res.json({message:'error al saludar'})
        }
    }
}


export default SaludoController