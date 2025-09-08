import React, { useEffect, useRef } from "react";
import "./LoanStats.css";

export default function LoanStats({ loans }) {
  const pieRef = useRef();
  const barRef = useRef();
  const pieChart = useRef();
  const barChart = useRef();

  useEffect(() => {
    // Clean previous charts
    if (pieChart.current) pieChart.current.destroy();
    if (barChart.current) barChart.current.destroy();

    if (loans.length === 0) return;

    // Pie chart
    const banks = {};
    loans.forEach((loan) => {
      const val = loan.loanAmount * (1 + loan.interestRate / 100);
      banks[loan.bankName] = (banks[loan.bankName] || 0) + val;
    });
    const bankNames = Object.keys(banks);
    const bankAmounts = Object.values(banks);

    pieChart.current = new window.Chart(pieRef.current, {
      type: "pie",
      data: {
        labels: bankNames,
        datasets: [
          {
            data: bankAmounts,
            backgroundColor: [
              "rgba(79, 70, 229, 0.7)",
              "rgba(16, 185, 129, 0.7)",
              "rgba(239, 68, 68, 0.7)",
              "rgba(245, 158, 11, 0.7)",
              "rgba(139, 92, 246, 0.7)",
            ],
            borderWidth: 2,
            borderColor: "#fff",
            hoverOffset: 12,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom", labels: { font: { size: 14 } } },
          tooltip: { enabled: true, backgroundColor: "#6366f1", titleColor: "#fff", bodyColor: "#fff" }
        },
        animation: { animateScale: true, animateRotate: true }
      },
    });

    // Bar chart
    barChart.current = new window.Chart(barRef.current, {
      type: "bar",
      data: {
        labels: loans.map((l) => l.clientName),
        datasets: [
          {
            label: "Montant à payer (€)",
            data: loans.map((l) => l.loanAmount * (1 + l.interestRate / 100)),
            backgroundColor: "rgba(79, 70, 229, 0.7)",
            borderColor: "rgba(79, 70, 229, 1)",
            borderWidth: 1.5,
            borderRadius: 8,
            hoverBackgroundColor: "rgba(16, 185, 129, 0.7)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, ticks: { color: "#6366f1", font: { weight: "bold" } } },
          x: { ticks: { color: "#6366f1", font: { weight: "bold" } } }
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true, backgroundColor: "#6366f1", titleColor: "#fff", bodyColor: "#fff" }
        },
        animation: { duration: 900, easing: "easeOutBounce" }
      },
    });
    // Clean up
    return () => {
      if (pieChart.current) pieChart.current.destroy();
      if (barChart.current) barChart.current.destroy();
    };
  }, [loans]);

  // Stats
  const amountsToPay = loans.map((l) => l.loanAmount * (1 + l.interestRate / 100));
  const total = amountsToPay.reduce((sum, a) => sum + a, 0);
  const min = amountsToPay.length ? Math.min(...amountsToPay) : 0;
  const max = amountsToPay.length ? Math.max(...amountsToPay) : 0;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl mb-10 animate-fade-in">
      <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-700 mb-8 drop-shadow-lg">
        <i className="fa-solid fa-chart-pie animate-bounce"></i>
        Bilan des prêts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="stat-card bg-indigo-50 p-6 rounded-xl flex flex-col items-center shadow transition-all">
          <span className="text-3xl mb-2 text-indigo-500">
            <i className="fa-solid fa-sack-dollar"></i>
          </span>
          <h3 className="text-lg font-medium text-indigo-800">Total à payer</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-1">€{total.toFixed(2)}</p>
        </div>
        <div className="stat-card bg-green-50 p-6 rounded-xl flex flex-col items-center shadow transition-all">
          <span className="text-3xl mb-2 text-green-500">
            <i className="fa-solid fa-arrow-down-1-9"></i>
          </span>
          <h3 className="text-lg font-medium text-green-800">Montant minimal</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">€{min.toFixed(2)}</p>
        </div>
        <div className="stat-card bg-red-50 p-6 rounded-xl flex flex-col items-center shadow transition-all">
          <span className="text-3xl mb-2 text-red-500">
            <i className="fa-solid fa-arrow-up-9-1"></i>
          </span>
          <h3 className="text-lg font-medium text-red-800">Montant maximal</h3>
          <p className="text-2xl font-bold text-red-600 mt-1">€{max.toFixed(2)}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-indigo-50 p-6 rounded-xl shadow-md transition-all animate-fade-in">
          <h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-chart-pie"></i>
            Répartition par banque
          </h3>
          <canvas ref={pieRef} className="w-full h-64 stats-canvas"></canvas>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow-md transition-all animate-fade-in">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-chart-column"></i>
            Montants à payer
          </h3>
          <canvas ref={barRef} className="w-full h-64 stats-canvas"></canvas>
        </div>
      </div>
    </div>
  );
}