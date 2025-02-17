import React from "react";

const InvoiceItem = ({ invoice, isFirst, isLast, isSelected, toggleSelection, type }) => {
  return (
    <label
      className={`flex items-center justify-between p-4 cursor-pointer border-b ${
        isSelected ? "bg-blue-100 border-blue-400" : "hover:bg-gray-100"
      } ${isFirst ? "rounded-t-lg" : ""} ${isLast ? "rounded-b-lg" : ""}`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelection(invoice.id)}
          className="w-4 h-4 text-blue-600 rounded-full"
        />
        <span className="font-medium text-blue-700">
          {invoice.id} ({invoice.organization_id})
        </span>
      </div>
      <span className="text-black font-semibold">
        ${invoice.amount.clp} CLP
        <div className="text-gray-600 font-normal">(${invoice.amount.usd} USD)</div>
      </span>
      <span className="text-gray-600">{type === "received" ? "Recibida" : invoice.reference}</span>
    </label>
  );
};

export default InvoiceItem;
