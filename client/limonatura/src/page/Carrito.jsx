import NavBar from "../components/NavBar"
import React, { useState, useEffect, useRef } from 'react';
import Modal from "../components/Modal";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";


function Carrito () {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isPagoOpen, setisPago] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('');
    const [userName, setUserName] = useState('')
    const renderOne = useRef(false)
    const [cardInfo, setCardInfo] = useState({
        number: '',
        expiry: '',
        cvv: ''
    });
    const [paymentComplete, setPaymentComplete] = useState(false);
    const pdf = new jsPDF();


    
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
 
        const products = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): [];
        setCartItems(products);
    }, []);

    useEffect(() => {
        const newTotal = cartItems.reduce((sum, item) => sum + (parseInt(item.precio) * item.cantidad), 0);
        setTotal(newTotal);
    }, [cartItems]);


    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setCardInfo({ number: '', expiry: '', cvv: '' });
    };

    const handleInputChange = (e) => {
        setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
    };

    const getAllUser = async (idUser) => {
        const url = `http://localhost:3000/usuarioManagment/usuarios/get/show/all/${idUser}`
        const response = await fetch(url, {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await response.json()
        return data
    }

     
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const idUser = localStorage.getItem('idUser')
        const cart = JSON.parse(localStorage.getItem('cart'))
        const data = await getAllUser(idUser)
        
 
        
        
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.text("Boleta de Compra", 105, 20, { align: "center" });

         
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text(`Nombre: ${data.nombre}`, 10, 40);
        pdf.text(`RUT: ${data.rut}`, 10, 45);
        pdf.text(`Teléfono: ${data.telefono}`, 10, 50);
        pdf.text(`Email: ${data.email}`, 10, 55);
        pdf.text(`Dirección: ${data.usuario_direccion.calle}, ${data.usuario_direccion.comuna}, ${data.usuario_direccion.ciudad}, ${data.usuario_direccion.pais}`, 10, 60);

        
        pdf.text(`Método de pago: ${paymentMethod}`, 10, 70);

        
        const columns = ["Producto", "Descripción", "Cantidad", "Precio Unitario", "Subtotal"];
        const rows = cart.map((item) => [
            item.tipo,
            item.descripcion,
            1, 
            `$${item.precio}`,
            `$${item.precio }`,
        ]);

        autoTable(pdf, {
            startY: 80,
            head: [columns],
            body: rows,
            theme: "grid",
            headStyles: { fillColor: [41, 128, 185] },
            bodyStyles: { textColor: [0, 0, 0] }, 
            margin: { left: 10, right: 10 },
        });

        
        const finalY = pdf.lastAutoTable.finalY || 80;
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Total: $${total}`, 10, finalY + 10);

        
        pdf.save("boleta-compra.pdf");

        
        setPaymentComplete(true);
        localStorage.removeItem('cart');
        setCartItems([]);



    };

    const cleanCart = () => {
        localStorage.removeItem('cart')
        window.location.reload()
    }

    
     const closePaymentModal = () => {
        setisPago(false);
        setPaymentMethod('');
        setCardInfo({ number: '', expiry: '', cvv: '' });
        setPaymentComplete(false);
    };


    return (
        <div className="min-h-screen bg-green-50">
            <NavBar userName={userName} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-green-800 mb-6">Tu Carrito</h1>
                {cartItems.length == 0 ? (
                    <p className="text-lg text-gray-600">Tu carrito está vacío.</p>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-b border-gray-200 py-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-green-700">{item.tipo}</h3>
                                    <p className="text-gray-600">{item.descripcion}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-green-800">${parseInt(item.precio).toLocaleString()}</p>
                                    <p className="text-gray-600">Cantidad: {item.cantidad}</p>
                                </div>
                            </div>
                        ))}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-green-800">Total:</span>
                                <span className="text-2xl font-bold text-green-800">${total.toLocaleString()}</span>
                            </div>
                            <button onClick={() => setisPago(true)} className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                Proceder al Pago
                            </button>
                            <button onClick={() => cleanCart()} className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Modal isOpen={isPagoOpen} onClose={() => closePaymentModal()}>
            <div className="p-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Método de Pago</h2>
                    {!paymentComplete ? (
                        <>
                            <div className="mb-4">
                                <button
                                    onClick={() => handlePaymentMethodChange('credit')}
                                    className={`mr-2 px-4 py-2 rounded ${paymentMethod === 'credit' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                    Crédito
                                </button>
                                <button
                                    onClick={() => handlePaymentMethodChange('debit')}
                                    className={`px-4 py-2 rounded ${paymentMethod === 'debit' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                    Débito
                                </button>
                            </div>
                            {paymentMethod && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Número de tarjeta</label>
                                        <input
                                            type="text"
                                            id="number"
                                            name="number"
                                            value={cardInfo.number}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                                            {paymentMethod === 'credit' ? 'Fecha de vencimiento' : 'Fecha de caducidad'}
                                        </label>
                                        <input
                                            type="text"
                                            id="expiry"
                                            name="expiry"
                                            value={cardInfo.expiry}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                                            {paymentMethod === 'credit' ? 'Código de seguridad' : 'CVV'}
                                        </label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            name="cvv"
                                            value={cardInfo.cvv}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                        Pagar
                                    </button>
                                </form>
                            )}
                        </>
                    ) : (
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600 mb-4">¡Pago completado con éxito!</p>
                            <p className="text-lg text-gray-600">Gracias por su compra.</p>
                            <button onClick={closePaymentModal} className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                Cerrar
                            </button>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}


export default Carrito