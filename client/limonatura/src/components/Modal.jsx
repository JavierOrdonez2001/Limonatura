


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <button onClick={onClose} className="float-right text-gray-500 hover:text-gray-700">×</button>
          {children}
        </div>
      </div>
    );
};


export default Modal