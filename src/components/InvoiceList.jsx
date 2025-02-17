import React from "react";

const InvoiceList = ({ children }) => {
  return (
    <div className="w-full max-w-2xl rounded-lg shadow-md border border-gray-300">
      {children}
    </div>
  );
};

export default InvoiceList;
