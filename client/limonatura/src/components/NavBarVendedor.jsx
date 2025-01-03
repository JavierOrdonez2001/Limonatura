

function NavBarVendedor ({userName, cartCount}) {

    const renderCarrito = () => {
        window.location.href = './CarritoVendedor'
    }
 
    const cerrarSession = () => {
        localStorage.clear()
        window.location.href = '/'
    }

    return (
        <nav className="bg-green-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-lg font-semibold">
              Hola, bienvenido a Limonatura señor/a {userName}
            </div>
            <div className="flex items-center space-x-4">

              <button onClick={renderCarrito} className=" relative hover:text-green-200 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
              </button>
              <button onClick={cerrarSession} className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md transition-colors duration-300">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </nav>
    );
}

export default NavBarVendedor