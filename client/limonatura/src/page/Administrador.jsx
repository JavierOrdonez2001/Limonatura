import { useEffect, useRef, useState } from "react"
import NavBar from "../components/NavBar"
import Modal from "../components/Modal"
import Swal from 'sweetalert2';

function Administrador () {
    const renderOne = useRef(false)
    const [userName, setUserName] = useState('')
    const [products, setProducts] = useState([])
    const [isCreateOpen, setCreate] = useState(false)
    const [isUpdateOpen, setUpdate] = useState(false)
    const [cartCount, setCartCount] = useState(0); 
    const [token, setToken] = useState('')
    const [selectedProduct, setSelectedProduct] = useState(null)
    
    
   
    useEffect(() => {
        const getUser = async () => {
            if(!renderOne.current){
                const idUser = localStorage.getItem('idUser')
                const url = `http://localhost:3000/usuarioManagment//usuarios/get/byId/${idUser}`
                const response = await fetch(url, {
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                const data = await response.json()
                setUserName(data.nombre)
                
                
                renderOne.current = true;
            }
        }
        getUser()

    },[renderOne])

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        setToken(token)
        
    })
 
    useEffect(() => {
        const getProduct = async () => {      
            const url = 'http://localhost:3000/productoManagment/productos/get/all'
                const response = await fetch(url, {
                        method:'GET',
                        headers:{
                            'Content-Type':'application/json'
                        }
            })
            const data = await response.json()
            setProducts(data)                      
        }
        getProduct()
        
        const cart = JSON.parse(localStorage.getItem('cart')) || []; 
        setCartCount(cart.length) 
    },[])
    
    const addToCart = (product) => { 
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({...product, cantidad:1})
        localStorage.setItem('cart', JSON.stringify(cart))
        setCartCount(cart.length)
    }
 
    const deleteProduct = async (idProducto, token) => {
        const url = `http://localhost:3000/productoManagment/productos/delete/${idProducto}`
        const response = await fetch(url, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':token
            }
        })
        await response.json()
        window.location.reload()      
    }


  
    const handleCreateProduct = async (event) => {
        event.preventDefault()
        const form = event.target
        const formData = new FormData(form)
        const newProduct = Object.fromEntries(formData.entries())
        const token = localStorage.getItem('authToken')
        
        const url = 'http://localhost:3000/productoManagment/productos/post/create' 
     

        const response = await fetch(url, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':token
            },
            body:JSON.stringify({
                tipo:newProduct.tipo,
                descripcion:newProduct.descripcion,
                precio:parseInt(newProduct.precio),
                stock:parseInt(newProduct.stock),
                peso:parseInt(newProduct.peso),
                imagen:newProduct.imagen
            })
        })

        const data = await response.json()
        form.reset()
        Swal.fire({
            icon: 'success',
            title: 'Producto creado',
            text: `El producto "${data.descripcion}" ha sido creado con éxito.`,
        });
        
        
        
      

    }


    const updateProduct = async (event) => {
        event.preventDefault()
        
        const token = localStorage.getItem('authToken')
        const form = event.target
        const formData = new FormData(form)
        const newProduct = Object.fromEntries(formData.entries())
        
        const url = `http://localhost:3000/productoManagment/productos/update/${selectedProduct.idProducto}`
        
        
        const response = await fetch(url, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':token
            },
            body:JSON.stringify({
                idProducto: selectedProduct.idProducto,
                tipo:newProduct.tipo,
                descripcion:newProduct.descripcion,
                precio: parseInt(newProduct.precio),
                stock: parseInt(newProduct.stock),
                peso: parseInt(newProduct.peso),
                imagen: newProduct.imagen
            })
        })

        await response.json()
        window.location.reload()
        


    }
   
    

    

    return(
        <div className="min-h-screen bg-green-50">
        <NavBar userName={userName} cartCount={cartCount}></NavBar>
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-green-800 mb-6">Panel de Administrador</h1>
            <button onClick={() => setCreate(true)} className="mb-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Crear Nuevo Producto
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((element) => (
                    <div key={element.idProducto} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                            src={element.imagen} 
                            alt={element.descripcion} 
                            className="w-full h-48 object-cover" 
                        />
                        <div className="p-4">
                            <h2 className="font-semibold text-lg mb-2 text-green-800">{element.descripcion}</h2>
                            <p className="text-gray-600 mb-1">Stock: {element.stock}</p>
                            <p className="text-gray-600 mb-1">Precio: ${element.precio}</p>
                            <p className="text-gray-600 mb-4">Peso: {element.peso} gramos</p>
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => addToCart(element)} className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-sm">
                                    Agregar al carrito
                                </button>
                                <button onClick={() => {setUpdate(true); setSelectedProduct(element)} } className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm">
                                    Actualizar
                                </button>
                                <button onClick={() => deleteProduct(element.idProducto, token)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Modal isOpen={isCreateOpen} onClose={() => setCreate(false)}>
        <div className="p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Crear Nuevo Producto</h2>
                <form onSubmit={handleCreateProduct} className="space-y-4">
                    <div>
                        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
                        <input type="text" id="tipo" name="tipo"  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea id="descripcion" name="descripcion"  rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio</label>
                        <input type="number" id="precio" name="precio"   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                        <input type="number" id="stock" name="stock"   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div>
                        <label htmlFor="peso" className="block text-sm font-medium text-gray-700">Peso (gramos)</label>
                        <input type="number" id="peso" name="peso"  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div>
                        <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">URL de la imagen</label>
                        <input type="url" id="imagen" name="imagen"  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Crear Producto
                    </button>
                </form>
            </div>
        </Modal>


        <Modal isOpen={isUpdateOpen} onClose={() => setUpdate(false)}>
        <div className="p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Actualizar Producto</h2>
                <form onSubmit={updateProduct} className="space-y-4">
                    <div>
                        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
                        <input defaultValue={selectedProduct?.tipo || ''} type="text" id="tipo" name="tipo"  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea defaultValue={selectedProduct?.descripcion || ''} id="descripcion" name="descripcion"  rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio</label>
                        <input defaultValue={selectedProduct?.precio || ''} type="number" id="precio" name="precio"  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                        <input defaultValue={selectedProduct?.stock || ''} type="number" id="stock" name="stock"  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div>
                        <label htmlFor="peso" className="block text-sm font-medium text-gray-700">Peso (gramos)</label>
                        <input defaultValue={selectedProduct?.peso || ''} type="number" id="peso" name="peso"  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div>
                        <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">URL de la imagen</label>
                        <input defaultValue={selectedProduct?.imagen || ''} type="url" id="imagen" name="imagen" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Actualizar Producto
                    </button>
                </form>
            </div>
        </Modal>
    </div>
    )
}

export default Administrador