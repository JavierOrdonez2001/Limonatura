import NavBar from "../components/NavBar"
import { useEffect, useRef, useState } from "react"

function Usuario(){
    const renderOne = useRef(false)
    const [userName, setUserName] = useState('')
    const [products, setProducts] = useState([])
    const [cartCount, setCartCount] = useState(0);
    
   
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




    return(
        <div className="min-h-screen bg-green-50">
        <NavBar userName={userName} cartCount={cartCount}></NavBar>
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-green-800 mb-6">Panel de Usuario</h1>

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
                         
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )

}

export default Usuario