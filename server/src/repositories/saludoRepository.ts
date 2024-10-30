import { IsaludoMessage } from '../interfaces/CRUDinterface.js'



class SaludoRepository implements IsaludoMessage{
    saludo(message:string): string {
        let saveMessage:string = message
        return saveMessage
        
    }
}

export default SaludoRepository





