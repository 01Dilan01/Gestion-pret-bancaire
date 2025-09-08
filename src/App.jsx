import React, { useState, useEffect } from "react";
import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import LoanForm from "./components/loan/LoanForm.jsx";
import LoanList from "./components/loan/LoanList.jsx";
import LoanStats from "./components/loan/LoanStats.jsx";
import "./App.css";
import "./index.css";

export default function App() {
  const [loans, setLoans] = useState([]);
  const [tab, setTab] = useState(() => localStorage.getItem("tab") || "add");
  const [editLoan, setEditLoan] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  // --- Connexion persistante ---
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("loggedIn") === "true");
  const [user, setUser] = useState(() => localStorage.getItem("user") || "");
  const [showRegister, setShowRegister] = useState(false);

  // Charger les prêts depuis le back-end au démarrage ou après modification
  const fetchLoans = () => {
    fetch("http://localhost/Projet%20vueJS%20L2/backend-php/pret.php")
      .then(res => res.json())
      .then(data => setLoans(
        Array.isArray(data)
          ? data.map(l => ({
              id: l.id,
              accountNumber: l.num_compte,
              clientName: l.nom_client,
              bankName: l.nom_banque,
              loanAmount: parseFloat(l.montant),
              loanDate: l.date_pret,
              interestRate: parseFloat(l.taux_pret),
              montant_a_payer: l.montant_a_payer ? parseFloat(l.montant_a_payer) : undefined,
            }))
          : []
      ))
      .catch(() => setLoans([]));
  };

  useEffect(() => {
    if (loggedIn) fetchLoans();
  }, [loggedIn]);

  // LOGIN
  const handleLogin = (username) => {
    setUser(username);
    setLoggedIn(true);
    setShowRegister(false);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("user", username);
    fetchLoans();
  };

  // Déconnexion
  const handleLogout = () => {
    setLoggedIn(false);
    setUser("");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("tab");
  };

  // Add or update loan (POST ou PUT)
  const handleSaveLoan = (loan, idx) => {
    const payload = {
      num_compte: loan.accountNumber,
      nom_client: loan.clientName,
      nom_banque: loan.bankName,
      montant: loan.loanAmount,
      date_pret: loan.loanDate,
      taux_pret: loan.interestRate,
    };
    let url = "http://localhost/Projet%20vueJS%20L2/backend-php/pret.php";
    let method = "POST";
    if (loan.id) {
      // Edition
      payload.id = loan.id;
      method = "PUT";
    }
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message && data.message.includes("réussie")) {
          setMessage({ type: "success", text: data.message });
          fetchLoans();
        } else {
          setMessage({ type: "error", text: data.message || "Erreur" });
        }
        setEditLoan(null);
        setTab("list");
        localStorage.setItem("tab", "list");
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      })
      .catch(() => {
        setMessage({ type: "error", text: "Erreur réseau" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      });
  };

  // Edit
  const handleEditLoan = (idx) => {
    setEditLoan({ ...loans[idx], idx });
    setTab("add");
    localStorage.setItem("tab", "add");
  };

  // Delete
  const handleDeleteLoan = (idx) => {
    const loan = loans[idx];
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce prêt ?")) {
      fetch(`http://localhost/Projet%20vueJS%20L2/backend-php/pret.php?id=${loan.id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(data => {
          if (data.message && data.message.includes("réussie")) {
            setMessage({ type: "success", text: data.message });
            fetchLoans();
          } else {
            setMessage({ type: "error", text: data.message || "Erreur" });
          }
          setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        })
        .catch(() => {
          setMessage({ type: "error", text: "Erreur réseau" });
          setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        });
    }
  };

  // Sidebar tabs
  const tabs = [
    {
      id: "add",
      label: editLoan ? "Modifier le prêt" : "Ajouter un prêt",
      icon: <i className="fa-solid fa-plus-circle"></i>,
    },
    {
      id: "list",
      label: "Liste des prêts",
      icon: <i className="fa-solid fa-list"></i>,
    },
    {
      id: "stats",
      label: "Bilan et graphiques",
      icon: <i className="fa-solid fa-chart-pie"></i>,
    },
  ];

  // LOGIN PAGE / REGISTER PAGE
  if (!loggedIn) {
    if (showRegister) {
      return (
        <RegisterForm
          onRegister={handleLogin}
          onBackToLogin={() => setShowRegister(false)}
        />
      );
    }
    return (
      <LoginForm
        onLogin={handleLogin}
        onRegisterRequest={() => setShowRegister(true)}
      />
    );
  }

  // MAIN APP
  return (
    <div id="app-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1.2rem 0" }}>
          <i className="fa-solid fa-hand-holding-dollar" style={{ fontSize: "2.5rem", color: "#fff" }}></i>
        </div>
        <nav className="nav-menu">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? "active" : ""}
              onClick={() => {
                setTab(t.id);
                localStorage.setItem("tab", t.id);
                if (t.id === "add") setEditLoan(null);
              }}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer" style={{textAlign: "center"}}>
          <span>
            <i className="fa-regular fa-copyright"></i>
            {" "}
            2025
          </span>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 text-indigo-700 mb-2">
              <i className="fa-solid fa-hand-holding-dollar"></i>
              Gestion des Prêts Bancaires
            </h1>
            <p className="text-gray-600 mb-6">
              Système de suivi des prêts clients
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="header-user-card mr-4 text-indigo-700 font-semibold flex items-center gap-2">
              <i className="fa-solid fa-user"></i> {user}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded font-semibold hover:bg-red-200 transition"
              title="Se déconnecter"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Déconnexion
            </button>
          </div>
        </header>

        <div className="section-animated">
          {tab === "add" && (
            <div className="form-card">
              <LoanForm
                onSave={handleSaveLoan}
                loanToEdit={editLoan}
                key={editLoan ? editLoan.idx : "new"}
              />
            </div>
          )}
          {tab === "list" && (
            <div className="table-card">
              <LoanList
                loans={loans}
                onEdit={handleEditLoan}
                onDelete={handleDeleteLoan}
                message={message}
               />
            </div>
          )}
          {tab === "stats" && (
            <div className="form-card">
              <LoanStats loans={loans} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}