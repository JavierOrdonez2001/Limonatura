import NavBarVendedor from '../components/NavBarVendedor';
import React, { useState, useEffect, useRef } from 'react';
import Modal from "../components/Modal";

function CarritoVendedor () {
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
    const [error, setError] = useState('');
    const [change, setChange] = useState(0);
    const [cashAmount, setCashAmount] = useState('');


    
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
        const products = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        setCartItems(products);
    }, []);

    useEffect(() => {
        const newTotal = cartItems.reduce((sum, item) => sum + (parseInt(item.precio) * item.cantidad), 0);
        setTotal(newTotal);
    }, [cartItems]);


    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setError('');
        setChange(0);
        setCashAmount('');
        setPaymentComplete(false);
    };

  
    
    const handleCashInputChange = (e) => {
        setCashAmount(e.target.value);
        setError('');
        setChange(0);
        setPaymentComplete(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (paymentMethod === 'cash') {
            const cashValue = parseFloat(cashAmount);
            if (cashValue < total) {
                setError('El monto en efectivo es insuficiente');
                return;
            } else if (cashValue > total) {
                setChange(cashValue - total);
            }
        }
        
        setPaymentComplete(true);
        
        localStorage.removeItem('cart');
        setCartItems([]);
    };


    
    const closePaymentModal = () => {
        setisPago(false);
        setPaymentMethod('');
        setCashAmount('');
        setChange(0);
        setError('');
        setPaymentComplete(false);
    };

    const cleanCart = () => {
        localStorage.removeItem('cart')
        window.location.reload()
    }


    return (
        <div className="min-h-screen bg-green-50">
            <NavBarVendedor userName={userName} />
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
            <Modal isOpen={isPagoOpen} onClose={() => setisPago(false)}>
            <div className="p-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Método de Pago</h2>
                    {!paymentComplete ? (
                        <>
                            <div className="mb-4 space-x-2">
                                <button
                                    onClick={() => handlePaymentMethodChange('credit')}
                                    className={`px-4 py-2 rounded ${paymentMethod === 'credit' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                    Crédito
                                </button>
                                <button
                                    onClick={() => handlePaymentMethodChange('debit')}
                                    className={`px-4 py-2 rounded ${paymentMethod === 'debit' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                    Débito
                                </button>
                                <button
                                    onClick={() => handlePaymentMethodChange('cash')}
                                    className={`px-4 py-2 rounded ${paymentMethod === 'cash' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                    Efectivo
                                </button>
                            </div>
                            {paymentMethod && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="text-xl font-semibold text-green-700">
                                        Total a pagar: ${total.toLocaleString()}
                                    </div>
                                    {paymentMethod === 'cash' && (
                                        <div>
                                            <label htmlFor="cashAmount" className="block text-sm font-medium text-gray-700">Monto en efectivo</label>
                                            <input
                                                type="number"
                                                id="cashAmount"
                                                name="cashAmount"
                                                value={cashAmount}
                                                onChange={handleCashInputChange}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                                required
                                            />
                                        </div>
                                    )}
                                    {error && <p className="text-red-500">{error}</p>}
                                    {change > 0 && <p className="text-green-600">Vuelto: ${change.toLocaleString()}</p>}
                                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                        Finalizar Pago
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


export default CarritoVendedor