# Gestion des Prêts Bancaires - Projet VueJS L2

Ce projet est une application web de gestion des prêts bancaires pour les clients, réalisée avec **React** (front-end) et **PHP/MySQL** (back-end).  
L’interface permet d’ajouter, modifier, supprimer et visualiser les prêts, ainsi que de consulter des statistiques graphiques.

---

## Fonctionnalités

- **Authentification** (création de compte et connexion)
- **Ajout, modification, suppression** de prêts bancaires
- **Liste des prêts** avec affichage dynamique
- **Statistiques** : total, min, max, graphiques (pie/bar)
- **Design moderne** et responsive

---

## Structure du projet

```
Projet vueJS L2/
│
├── backend-php/
│   ├── db.php         # Connexion à la base MySQL
│   ├── pret.php       # API CRUD des prêts
│   └── auth.php       # API d'authentification
│
├── src/
│   ├── App.jsx        # Composant principal React
│   ├── main.jsx       # Point d'entrée React
│   ├── index.css      # Styles globaux
│   ├── App.css        # Styles de l'application
│   ├── components/
│   │   ├── auth/      # Login et Register
│   │   └── loan/      # Formulaire, liste, stats des prêts
│   └── assets/        # Images
└── ...
```

---

## Installation

### 1. **Base de données**

- Crée une base `pret_db` dans **phpMyAdmin**.
- Crée la table :

```sql
CREATE TABLE pret_bancaire (
  id INT AUTO_INCREMENT PRIMARY KEY,
  num_compte VARCHAR(32) NOT NULL,
  nom_client VARCHAR(64) NOT NULL,
  nom_banque VARCHAR(64) NOT NULL,
  montant DECIMAL(12,2) NOT NULL,
  date_pret DATE NOT NULL,
  taux_pret DECIMAL(5,2) NOT NULL
);
```

### 2. **Back-end PHP**

- Place le dossier `backend-php` dans ton dossier WAMP :  
  `c:\wamp64\www\Projet vueJS L2\backend-php`
- Vérifie la config de connexion dans [`db.php`](backend-php/db.php).

### 3. **Front-end React**

- Place le dossier `src` dans le même dossier.
- Installe les dépendances :
  ```bash
  npm install
  ```
- Lance le front-end :
  ```bash
  npm start
  ```
- Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

---

## Utilisation

- **Créer un compte** ou se connecter.
- **Ajouter un prêt** via le formulaire.
- **Voir la liste** et les statistiques.
- **Modifier/Supprimer** un prêt via les boutons d’action.

---

## API

- **GET** `/backend-php/pret.php` : liste des prêts
- **POST** `/backend-php/pret.php` : ajout d’un prêt
