import React from "react";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceList from "./InvoiceList";
import InvoiceItem from "./InvoiceItem";

const InvoiceSelection = ({ invoices, title, type, selectedInvoices, setSelectedInvoices }) => {
  const toggleSelection = (invoiceId) => {
    const newSelection = new Set(selectedInvoices);

    if (type === "received") {
      setSelectedInvoices(new Set([invoiceId]));
    } else {
      if (newSelection.has(invoiceId)) {
        newSelection.delete(invoiceId);
      } else {
        newSelection.add(invoiceId);
      }

      setSelectedInvoices(newSelection);
    }
  };

  return (
    <div className="flex flex-col items-center py-6 px-2">
      <InvoiceHeader title={title} />
      <InvoiceList>
        {invoices.length === 0 ? (
          <p className="text-gray-500 p-4">Por el momento no hay nada disponible :c</p>
        ) : (
          invoices.map((invoice, index) => (
            <InvoiceItem
              key={invoice.id}
              invoice={invoice}
              isFirst={index === 0}
              isLast={index === invoices.length - 1}
              isSelected={selectedInvoices.has(invoice.id)}
              toggleSelection={toggleSelection}
              type={type}
            />
          ))
        )}
      </InvoiceList>
    </div>
  );
};

export default InvoiceSelection;
