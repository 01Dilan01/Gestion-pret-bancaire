import React, { useState, useEffect } from "react";
import "./LoginAnim.css";
import "./LoginAnim-extra.css";
import backgroundImage from "../../assets/eco.jpg";

export default function LoginForm({ onLogin, onRegisterRequest }) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Gestion des Prêts Bancaires";

  useEffect(() => {
    setTypedText("");
    let idx = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, idx + 1));
      idx++;
      if (idx === fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
    setShake(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      u =>
        u.username === user.username &&
        u.password === user.password
    );
    if (
      (user.username === "admin" && user.password === "secret") ||
      found
    ) {
      onLogin(user.username);
    } else {
      setError("Identifiant ou mot de passe incorrect.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div
      className="min-h-screen b flex items-center justify-center relative login-bg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* SVG Animation courbe financière */}
      <svg
        className="fin-curve"
        viewBox="0 0 700 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          className="fin-curve-anim"
          points="0,180 100,120 200,150 300,70 400,110 500,40 600,100 700,50"
          stroke="#3b82f6"
          strokeWidth="4"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Pièces animées */}
        <circle className="coin-anim coin1" cx="100" cy="120" r="8" fill="#FFD700" />
        <circle className="coin-anim coin2" cx="300" cy="70" r="8" fill="#FFD700" />
        <circle className="coin-anim coin3" cx="500" cy="40" r="8" fill="#FFD700" />
      </svg>

      {/* Texte animé */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="typing-title gradient-title animate-title-entrance big-title drop-shadow-lg">
          {typedText}
        </h1>
      </div>

      <div className={`login-glass bg-white bg-opacity-90 p-8 rounded-xl shadow-md w-full max-w-sm animate-cardUp z-20 ${shake ? "shake" : ""}`}>
        <div className="flex flex-col items-center mb-6">
          <i className="fa-solid fa-building-columns text-4xl text-indigo-700 mb-2 animate-bankIcon"></i>
          <h2 className="text-2xl font-bold text-indigo-700 login-form-title-effect">Connexion</h2>
          <p className="text-gray-500 text-sm">Bienvenue sur Espace Crédit</p>
        </div>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center bg-red-100 px-3 py-2 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-sm font-medium text-indigo-700 mb-1">
              <i className="fa-solid fa-user mr-2"></i> Identifiant
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Nom d'utilisateur"
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-indigo-700 mb-1">
              <i className="fa-solid fa-lock mr-2"></i> Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Mot de passe"
            />
          </div>
          <button
            type="submit"
            className="btn-animated w-full py-2 bg-indigo-700 text-white font-semibold rounded hover:bg-indigo-800 transition flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
            Se connecter
          </button>
          <button
            type="button"
            className="btn-animated w-full py-2 mt-2 bg-indigo-100 text-indigo-700 font-semibold rounded hover:bg-indigo-200 transition flex items-center justify-center gap-2"
            onClick={onRegisterRequest}
          >
            <i className="fa-solid fa-user-plus"></i>
            Créer un compte
          </button>
        </form>
      </div>
    </div>
  );
}