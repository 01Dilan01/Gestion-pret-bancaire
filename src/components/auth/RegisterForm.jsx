import React, { useState, useEffect } from "react";
import "./RegisterAnim.css";
import backgroundImage from "../../assets/eco.jpg";

export default function RegisterForm({ onRegister, onBackToLogin }) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [typedText, setTypedText] = useState("");
  const fullText = "Créer un compte bancaire sécurisé";

  useEffect(() => {
    setTypedText("");
    let idx = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, idx + 1));
      idx++;
      if (idx === fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!user.username || !user.password) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.username === user.username)) {
      setError("Ce nom d'utilisateur existe déjà.");
      return;
    }
    users.push({ username: user.username, password: user.password });
    localStorage.setItem("users", JSON.stringify(users));
    onRegister(user.username);
  };

  return (
    <div
      className="register-bg-animated min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* SVG animée en fond (courbe financière + pièces) */}
      <svg
        className="fin-curve"
        viewBox="0 0 700 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          className="fin-curve-anim"
          points="0,180 80,120 160,150 250,90 340,115 430,40 560,100 700,50"
          stroke="#3b82f6"
          strokeWidth="4"
          fill="none"
          strokeLinejoin="round"
        />
        <circle className="coin-anim coin1" cx="80" cy="120" r="8" fill="#FFD700" />
        <circle className="coin-anim coin2" cx="250" cy="90" r="8" fill="#FFD700" />
        <circle className="coin-anim coin3" cx="430" cy="40" r="8" fill="#FFD700" />
      </svg>

      {/* Slogan animé */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <span className="typing-title">{typedText}<span className="typing-cursor">|</span></span>
      </div>

      <div className="register-glass bg-white bg-opacity-90 p-8 rounded-xl shadow-md w-full max-w-sm animate-fadeInRegister z-20">
        <div className="flex flex-col items-center mb-6">
          <i className="fa-solid fa-user-plus text-4xl text-indigo-700 mb-2 animate-pulseIcon"></i>
          <h2 className="text-2xl font-bold text-indigo-700">Créer un compte</h2>
          <p className="text-gray-500 text-sm mb-2">Remplissez le formulaire pour vous inscrire</p>
        </div>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center bg-red-100 px-3 py-2 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-sm font-medium text-indigo-700 mb-1">
              <i className="fa-solid fa-user mr-2"></i> Nom d'utilisateur
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
            className="w-full py-2 bg-indigo-700 text-white font-semibold rounded hover:bg-indigo-800 transition flex items-center justify-center gap-2 btn-animated"
          >
            <i className="fa-solid fa-user-plus"></i>
            Créer le compte
          </button>
          <button
            type="button"
            className="w-full py-2 mt-2 bg-indigo-100 text-indigo-700 font-semibold rounded hover:bg-indigo-200 transition flex items-center justify-center gap-2 btn-animated"
            onClick={onBackToLogin}
          >
            <i className="fa-solid fa-arrow-left"></i>
            Retour à la connexion
          </button>
        </form>
      </div>
    </div>
  );
}