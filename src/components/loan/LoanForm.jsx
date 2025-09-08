import React, { useState, useEffect } from "react";

export default function LoanForm({ onSave, loanToEdit }) {
  const [loan, setLoan] = useState({
    accountNumber: "",
    clientName: "",
    bankName: "",
    loanAmount: "",
    loanDate: "",
    interestRate: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loanToEdit) setLoan(loanToEdit);
    else setLoan({
      accountNumber: "",
      clientName: "",
      bankName: "",
      loanAmount: "",
      loanDate: "",
      interestRate: "",
    });
  }, [loanToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoan((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      onSave(
        {
          ...loan,
          loanAmount: parseFloat(loan.loanAmount),
          interestRate: parseFloat(loan.interestRate),
          id: loan.id, // important pour l'édition
        },
        loanToEdit ? loanToEdit.idx : null
      );
      setSubmitting(false);
      setLoan({
        accountNumber: "",
        clientName: "",
        bankName: "",
        loanAmount: "",
        loanDate: "",
        interestRate: "",
      });
    }, 500);
  };

  return (
    <form
      className="bg-white p-8 rounded-2xl shadow-2xl animate-fadeInUp transition-all duration-500"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-700 mb-6 drop-shadow-lg">
        <i className="fa-solid fa-plus-circle animate-bounce"></i>
        {loanToEdit ? "Modifier le prêt" : "Ajouter un prêt"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-indigo-700 font-semibold mb-2">
            <i className="fa-solid fa-hashtag mr-1"></i> Numéro de compte
          </label>
          <input
            type="text"
            name="accountNumber"
            value={loan.accountNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            placeholder="FR76..."
          />
        </div>
        <div>
          <label className="block text-indigo-700 font-semibold mb-2">
            <i className="fa-solid fa-user mr-1"></i> Nom du client
          </label>
          <input
            type="text"
            name="clientName"
            value={loan.clientName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            placeholder="Jean Dupont"
          />
        </div>
        <div>
          <label className="block text-indigo-700 font-semibold mb-2">
            <i className="fa-solid fa-building-columns mr-1"></i> Banque
          </label>
          <input
            type="text"
            name="bankName"
            value={loan.bankName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            placeholder="BNP Paribas"
          />
        </div>
        <div>
          <label className="block text-indigo-700 font-semibold mb-2">
            <i className="fa-solid fa-euro-sign mr-1"></i> Montant
          </label>
          <input
            type="number"
            name="loanAmount"
            value={loan.loanAmount}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            min={0}
            step={0.01}
            placeholder="15000"
          />
        </div>
        <div>
          <label className="block text-indigo-700 font-semibold mb-2">
            <i className="fa-solid fa-calendar-day mr-1"></i> Date du prêt
          </label>
          <input
            type="date"
            name="loanDate"
            value={loan.loanDate}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label className="block text-indigo-700 font-semibold mb-2">
            <i className="fa-solid fa-percent mr-1"></i> Taux d'intérêt (%)
          </label>
          <input
            type="number"
            name="interestRate"
            value={loan.interestRate}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            min={0}
            step={0.01}
            placeholder="3.5"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow hover:bg-indigo-700 transition"
        disabled={submitting}
      >
        {submitting
          ? loanToEdit
            ? "Modification en cours..."
            : "Ajout en cours..."
          : loanToEdit
          ? "Modifier le prêt"
          : "Ajouter le prêt"}
      </button>
    </form>
  );
}