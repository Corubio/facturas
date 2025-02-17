import React, { useState } from "react";
import AssignModal from "./AssignModal";

const AssignButton = ({ onAssign, invoicesAssigned }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => {
          setIsModalOpen(true)
          onAssign()
        }}
        className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
      >
        Asignar
      </button>

      <AssignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        invoicesAssigned={invoicesAssigned}
      />
    </div>
  );
};

export default AssignButton;
