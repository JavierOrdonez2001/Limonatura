import { IsaludoMessage } from '../interfaces/CRUDinterface.js'

class SaludoService{

    constructor(private saludoRepository: IsaludoMessage){}

    public getSaludo(message:string):string{
        return this.saludoRepository.saludo(message)
    }
}


export default SaludoService