import {config} from 'dotenv'
import express from 'express'
import morgan  from 'morgan'
import cors from 'cors';
import Auth from './middleware/auth.js';

// -------------------------------------------------------------
import RolesRoutes from './routes/roles.routes.js'
import RolesController from './controller/rolesController.js'
import RolesService from './service/rolesService.js'
import RolesRepository from './repositories/rolesRepository.js'
// -------------------------------------------------------------
import DireccionesRoutes from './routes/direcciones.routes.js'
import DireccionesController from './controller/direccionController.js'
import DireccionesServices from './service/direccionesService.js'
import DireccionesRepository from './repositories/direccionesRepository.js'
//---------------------------------------------------------------------------
import UsuarioRouter from './routes/usuarios.routes.js'
import UsuarioController from './controller/usuariosController.js'
import UsuariosService from './service/usuariosService.js'
import UsuariosRepository from './repositories/usuariosRepository.js'
// ----------------------------------------------------------------------------
import CarritoRouter from './routes/carrito.routes.js'
import CarritoController from './controller/carritoController.js'
import CarritoService from './service/carritoService.js'
import CarritoRepository from './repositories/carritoRepository.js'
// ----------------------------------------------------------------------------
import ProductoRouter from './routes/productos.routes.js'
import ProductoController from './controller/productosController.js'
import ProductosService from './service/productosService.js'
import ProductosRepository from './repositories/productosRepository.js'

config()
const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));


//middleware de autenticacion
const auth = new Auth()

// configuracion para los roles
const rolesRespository = new RolesRepository()
const rolesService = new RolesService(rolesRespository, rolesRespository, rolesRespository,rolesRespository)
const rolesController = new RolesController(rolesService)
const rolesRoutes = new RolesRoutes(rolesController)
app.use('/rolesmanagment', rolesRoutes.router )

// configuracion para las direcciones
const direccionRepository = new DireccionesRepository()
const direccionService = new DireccionesServices(direccionRepository, direccionRepository, direccionRepository)
const direccionController = new DireccionesController(direccionService)
const direccionRouter = new DireccionesRoutes(direccionController)
app.use('/direccionesManagment', direccionRouter.router)

//configuracion para los usuarios
const usuarioRepository = new UsuariosRepository()
const usuarioService = new UsuariosService( usuarioRepository, 
                                            usuarioRepository, 
                                            usuarioRepository, 
                                            usuarioRepository, 
                                            usuarioRepository)
const usuarioController = new UsuarioController(usuarioService)
const usuarioRouter = new UsuarioRouter(usuarioController, auth)
app.use('/usuarioManagment', usuarioRouter.router)

// configuracion para carrito
const carritoRepository = new CarritoRepository()
const carritoService =  new CarritoService(carritoRepository,carritoRepository,carritoRepository)
const carritoController = new CarritoController(carritoService)
const carritoRouter = new CarritoRouter(carritoController)
app.use('/carritoManagment', carritoRouter.router)

// configuracion para producto
const productoRepository = new ProductosRepository()
const productoService = new ProductosService(productoRepository, productoRepository, productoRepository)
const productoController = new ProductoController(productoService)
const productoRouter = new ProductoRouter(productoController, auth)
app.use('/productoManagment', productoRouter.router)


app.listen(PORT, () => {
    console.log('server listen on port ', PORT)
})