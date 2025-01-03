import React, { useEffect, useState } from 'react';
import Modal from './components/Modal';
import Swal from 'sweetalert2';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Administrador from './page/Administrador';
import Usuario from './page/Usuario';
import Vendedor from './page/Vendedor';
import Carrito from './page/Carrito';
import CarritoVendedor from './page/CarritoVendedor';


function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerType, setRegisterType] = useState(null);
  const [rol, setRol] = useState('')
  const [rolUser, setRolUser] = useState('')

  const handleRegisterClick = (type) => {
    setRegisterType(type);
    setIsRegisterOpen(true);
  };

  //crear un usuario
  const getRolId = async (rol) => {
    if(!rol) return;
    const url = `http://localhost:3000/rolesmanagment/roles/get/nameByName/${rol}`
    const response = await fetch(url,{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
    })
    if(!response.ok) throw new Error(`HTTP error: ${response.status}`)
    const data = await response.json()
    const idRol = data.idRol
    return idRol  
  }

  const createDireccion = async (pais, ciudad, comuna, calle, numero) => {
    const url = 'http://localhost:3000/direccionesManagment/direcciones/post/create';
    const response = await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        pais:pais,
        ciudad:ciudad,
        comuna:comuna,
        calle:calle,
        numero:numero
      })
    })
    const data = await response.json()
    return data
  }

  const createUser = async (nombre, rut, email, password, telefono, idRol, idDireccion) => {
    const url = 'http://localhost:3000/usuarioManagment/usuarios/post/create'
    const response = await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        nombre:nombre,
        rut:rut,
        email:email,
        password:password,
        telefono:telefono,
        id_rol_fk:idRol,
        id_direccion_fk:idDireccion
      })

    })
    const data  = await response.json()
    return data
  }
  const login = async (email, password) => {
    const url = 'http://localhost:3000/usuarioManagment/usuarios/login'
    const response = await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    })
    const data = response.json()
    return data
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const formaData = new FormData(form)
    const data = Object.fromEntries(formaData.entries())

    const direccion = {
      pais:data.pais,
      ciudad:data.ciudad,
      comuna:data.comuna,
      calle:data.calle,
      numero:data.numero
    }
    const usuario = {
      nombre:data.name,               
      rut:data.Rut,                 
      email:data.email,                    
      password:data.password,                 
      telefono:data.telefono,                
    }
    try{
      const idRol = await getRolId(rol)
      const dataDireccion = await createDireccion(
        direccion.pais, 
        direccion.ciudad, 
        direccion.comuna, 
        direccion.calle, 
        direccion.numero
      );
      const idDireccion = dataDireccion.idDirecciones
      await createUser(
        usuario.nombre,
        usuario.rut,
        usuario.email,
        usuario.password,
        usuario.telefono,
        idRol,
        idDireccion
      );
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'El usuario se ha registrado correctamente.',
        confirmButtonText: 'Aceptar',
      });
      form.reset()
      setRegisterType(null)
    }catch(err){
      console.error('Algo salio mal al registrar un usuario.')
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema durante el registro. Por favor, inténtalo de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }    
  }

  const handleLoginClick = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries())

    const dataLogin = await login(data.email, data.password)
    const token = dataLogin.token
    const rol_User = dataLogin.user.rol.rol
    localStorage.setItem('authToken', token)
    localStorage.setItem('idUser', dataLogin.user.idUsuario )
    setRolUser(rol_User)
  }

  useEffect(() => {
    switch(rolUser){
      case 'administrador':
        window.location.href= '/administrador'
      break;
      case 'usuario':
        window.location.href= '/usuario'
      break;
      case 'vendedor':
        window.location.href= '/vendedor'
      break; 
    }
  }, [rolUser])



  const Login = () => (
      
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-lime-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-8">
          <svg className="w-24 h-24 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <h1 className="text-4xl font-bold text-green-800 mt-4">Limonatura</h1>
          <p className="text-gray-600 mt-2">Carteras, joyas y productos para mujeres</p>
        </div>       
        <div className="space-y-4">
          <button onClick={() => setIsLoginOpen(true)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Iniciar Sesión
          </button>
          <button onClick={() => setIsRegisterOpen(true)} className="w-full border border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-4 rounded">
            Registrarse
          </button>
        </div>
      </div>

      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <form className="space-y-4" onSubmit={handleLoginClick}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="password" name="password" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Iniciar Sesión
          </button>
        </form>
      </Modal>

      <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Selecciona el tipo de registro</h2>
        <div className="space-y-2">
          <button onClick={() => {handleRegisterClick('usuario'); setRol('usuario')}} className="w-full border border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-4 rounded">Usuario Común</button>
          <button onClick={() => {handleRegisterClick('vendedor'); setRol('vendedor')}} className="w-full border border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-4 rounded">Vendedor</button>
          <button onClick={() => {handleRegisterClick('administrador'); setRol('administrador')} } className="w-full border border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-4 rounded">Administrador</button>
        </div>
      </Modal>

      <Modal isOpen={registerType !== null} onClose={() => setRegisterType(null)}>
        <h2 className="text-2xl font-bold mb-4">
          Registro de {registerType === 'usuario' ? 'Usuario' : registerType === 'vendedor' ? 'Vendedor' : 'Administrador'}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" id="name" name="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
          </div>
          <div>
            <label htmlFor="rut" className="block text-sm font-medium text-gray-700">Rut</label>
            <input type="text" id="Rut" name="Rut" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="password" name="password" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Telefono</label>
            <input type="telefono" id="telefono" name="telefono" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
          </div>



         {/* Direccion*/}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
            <input type="pais" id="pais" name="pais" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder='pais'/>
            <br />
            <input type="ciudad" id="ciudad" name="ciudad" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder='ciudad'/>
            <br />
            <input type="comuna" id="comuna" name="comuna" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder='comuna'/>
            <br />
            <input type="calle" id="calle" name="calle" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder='calle'/>
            <br />
            <input type="numero" id="numero" name="numero" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder='numero'/>
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Registrarse
          </button>
        </form>
      </Modal>
    </div>
  )

  return (
    <Router>
    <Routes>  
      <Route path="/" element={<Login />} />
      <Route path='/usuario' element={<Usuario/>}></Route>
      <Route path='/administrador' element={<Administrador/>}></Route>
      <Route path='/vendedor' element={<Vendedor/>}></Route>
      <Route path='/carrito' element={<Carrito/>}></Route>
      <Route path='/CarritoVendedor' element={<CarritoVendedor/>}></Route>
    </Routes>
  </Router>
   
  );
}

export default App
