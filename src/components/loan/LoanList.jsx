import React from "react";
import "./LoanList.css";

const formatCurrency = amount =>
  amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

export default function LoanList({ loans, onEdit, onDelete, message }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl mb-10 animate-fadeInUp transition-all duration-500">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-700 mb-6 drop-shadow-lg">
        <i className="fa-solid fa-list animate-bounce"></i> Liste des prêts
      </h2>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full bg-indigo-50 rounded-xl shadow-md">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                <i className="fa-solid fa-user mr-1"></i> Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                <i className="fa-solid fa-building-columns mr-1"></i> Banque
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                <i className="fa-solid fa-euro-sign mr-1"></i> Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                <i className="fa-solid fa-calendar-day mr-1"></i> Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                <i className="fa-solid fa-money-bill-wave mr-1"></i> À payer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loans.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Aucun prêt enregistré
                </td>
              </tr>
            ) : (
              loans.map((loan, idx) => {
                const amountToPay =
                  loan.loanAmount * (1 + parseFloat(loan.interestRate) / 100);
                return (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-user text-indigo-400"></i>
                        {loan.clientName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-building-columns text-indigo-400"></i>
                        {loan.bankName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-euro-sign text-indigo-400"></i>
                        {formatCurrency(loan.loanAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-calendar-day text-indigo-400"></i>
                        {new Date(loan.loanDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-800">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-money-bill-wave text-indigo-400"></i>
                        {formatCurrency(amountToPay)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <button
                        className="edit-btn text-indigo-700 px-3 py-2 rounded-lg shadow"
                        title="Modifier"
                        onClick={() => onEdit(idx)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        className="delete-btn text-red-600 px-3 py-2 rounded-lg shadow"
                        title="Supprimer"
                        onClick={() => onDelete(idx)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* Affichage du message de succès/erreur en bas du tableau */}
      {message && message.text && (
        <div
          className={`mt-5 text-center font-semibold px-5 py-3 rounded-xl shadow animate-fadeInUp ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}