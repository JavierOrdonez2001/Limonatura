import {config} from 'dotenv'
import express from 'express'
import SaludoRoutes from './routes/saludo.routes.js'
import SaludoController from './controller/saludoController.js'
import SaludoService from './service/saludoService.js'
import SaludoRepository from './repositories/saludoRepository.js'
// -------------------------------------------------------------
import RolesRoutes from './routes/roles.routes.js'
import RolesController from './controller/rolesController.js'
import RolesService from './service/rolesService.js'
import RolesRepository from './repositories/rolesRepository.js'

config()
const PORT = process.env.PORT
const app = express()
app.use(express.json())

// configuracion para saludar
const saludoRepository = new SaludoRepository()
const saludoService = new SaludoService(saludoRepository)
const saludoController = new SaludoController(saludoService)
const saludoRoutes = new SaludoRoutes(saludoController)
app.use('/saludo', saludoRoutes.router)

// configuracion para los roles
const rolesRespository = new RolesRepository()
const rolesService = new RolesService(rolesRespository, rolesRespository, rolesRespository)
const rolesController = new RolesController(rolesService)
const rolesRoutes = new RolesRoutes(rolesController)
app.use('/rolesmanagment', rolesRoutes.router )


app.listen(PORT, () => {
    console.log('server listen on port ', PORT)
})