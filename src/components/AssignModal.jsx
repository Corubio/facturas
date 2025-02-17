import React from "react";

const SuccessModal = ({ isOpen, onClose, invoicesAssigned }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <span className="text-6xl pb-5">✅</span>
        <span className="text-lg font-semibold text-gray-900">
          <p>Nota de crédito asignada correctamente:</p>
        </span>

        <button
          onClick={onClose}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md w-full hover:bg-indigo-700"
        >
          Seguir asignando
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
