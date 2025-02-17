import "./global.css";
import { useEffect, useState } from "react";
import InvoiceSelection from "./components/InvoiceSelection";
import AssignButton from "./components/AssignButton";

async function getPendingInvoices() {
  const response = await fetch(
    "https://recruiting.api.bemmbo.com/invoices/pending"
  );
  const data = await response.json();
  return data;
}

const App = () => {
  const [receivedInvoices, setReceivedInvoices] = useState([]);
  const [creditNoteInvoices, setCreditNoteInvoices] = useState([]);
  const [selectedReceived, setSelectedReceived] = useState(new Set());
  const [availableCreditNotes, setAvailableCreditNotes] = useState([]);
  const [selectedCreditNotes, setSelectedCreditNotes] = useState(new Set());
  const [invoicesAssigned, setInvoicesAssigned] = useState({received: [], creditNotes: []});
  const usdToClp = 947.95

  useEffect(() => {
    getPendingInvoices().then((data) => {
      const received = [];
      const creditNote = [];

      for (const invoice of data) {
        invoice.amount = invoice.currency === "USD"
          ? {clp: (invoice.amount * usdToClp).toFixed(2), usd: (invoice.amount).toFixed(2)}
          : {clp: (invoice.amount).toFixed(2), usd: (invoice.amount / usdToClp).toFixed(2)};
        if (invoice.type === "received") {
          received.push(invoice);
        } else if (invoice.type === "credit_note") {
          creditNote.push(invoice);
        }
      }

      setReceivedInvoices(received);
      setCreditNoteInvoices(creditNote);
    });
  }, []);

  useEffect(() => {
    const matchingCreditNotes = creditNoteInvoices.filter(
      (creditNote) =>
        selectedReceived.has(creditNote.reference)
    );

    setAvailableCreditNotes(matchingCreditNotes);
  }, [selectedReceived, creditNoteInvoices]);

  useEffect(() => {
    setSelectedCreditNotes(new Set());
  }, [selectedReceived])

  const assignInvoices = () => {
    const received = receivedInvoices.filter((invoice) => selectedReceived.has(invoice.id));
    const creditNotes = creditNoteInvoices.filter((creditNote) => selectedCreditNotes.has(creditNote.id));

    setInvoicesAssigned({received, creditNotes});
  };

  return (
    <div className="min-h-screen bg-white">
      <InvoiceSelection
        invoices={receivedInvoices}
        title="Selecciona una factura"
        type="received"
        selectedInvoices={selectedReceived}
        setSelectedInvoices={setSelectedReceived}
      />

      {selectedReceived.size > 0 && (
        <InvoiceSelection
          invoices={availableCreditNotes}
          title={`Selecciona una nota de crédito`}
          type="credit_note"
          selectedInvoices={selectedCreditNotes}
          setSelectedInvoices={setSelectedCreditNotes}
        />
      )}

      {selectedCreditNotes.size > 0 && selectedReceived.size > 0 && (
        <div
          onClick={assignInvoices}
        >
          <AssignButton
            invoicesAssigned={invoicesAssigned}
          />
        </div>
      )}

    </div>
  );
}

export default App;
