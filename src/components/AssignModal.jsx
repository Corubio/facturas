import React from "react";

const SuccessModal = ({ isOpen, onClose, invoicesAssigned }) => {
  if (!isOpen) return null;

  const getNuevoValor = () => {
    let nuevoValor = invoicesAssigned.received[0]?.amount.clp;
    invoicesAssigned.creditNotes.forEach((creditNote) => {
      nuevoValor -= creditNote.amount.clp;
    });
    return nuevoValor < 0 ? 0 : nuevoValor;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <span className="text-6xl pb-5">✅</span>
        <span className="text-lg font-semibold text-gray-900">
          <p>Nota de crédito asignada correctamente:</p>
          <p className="py-2">Factura {invoicesAssigned.received[0]?.id}: ${invoicesAssigned.received[0]?.amount.clp} CLP</p>
          {invoicesAssigned.creditNotes.map((creditNote) => (
            <span key={creditNote.id}>
              <p className="pt-2">Nota de crédito {creditNote.id}:</p>
              <p className="pb-2">-${creditNote.amount.clp} CLP</p>
            </span>
          ))}
          <p className="py-2"> Nuevo valor factura = ${getNuevoValor()} CLP </p>
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
