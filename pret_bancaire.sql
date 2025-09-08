-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 06 juin 2025 à 08:21
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pret_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `pret_bancaire`
--

DROP TABLE IF EXISTS `pret_bancaire`;
CREATE TABLE IF NOT EXISTS `pret_bancaire` (
  `id` int NOT NULL AUTO_INCREMENT,
  `num_compte` varchar(50) NOT NULL,
  `nom_client` varchar(100) NOT NULL,
  `nom_banque` varchar(100) NOT NULL,
  `montant` decimal(12,2) NOT NULL,
  `date_pret` date NOT NULL,
  `taux_pret` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `pret_bancaire`
--

INSERT INTO `pret_bancaire` (`id`, `num_compte`, `nom_client`, `nom_banque`, `montant`, `date_pret`, `taux_pret`) VALUES
(1, '1', 'SYLVIO', 'ACEP', 299999.00, '2025-06-05', 10.00),
(2, '2', 'FDGDF', 'FSG', 200000.00, '2025-06-05', 10.00);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
