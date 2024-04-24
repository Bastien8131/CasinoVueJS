-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 24 avr. 2024 à 23:26
-- Version du serveur : 10.5.23-MariaDB-0+deb11u1
-- Version de PHP : 8.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `casino`
--

-- --------------------------------------------------------

--
-- Structure de la table `data`
--

CREATE TABLE `data` (
  `idU` int(11) NOT NULL,
  `credit` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `data`
--

INSERT INTO `data` (`idU`, `credit`, `score`) VALUES
(19, 0, 0),
(20, 630, 0),
(21, 24, 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `bannie` tinyint(1) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `email`, `bannie`, `admin`) VALUES
(1, 'admin', 'admin', 0, 1),
(5, 'user3', 'user3', 0, 0),
(19, 'bastienb', 'bastienb@casino.com', 0, 0),
(20, 'bastienm', 'bastienm@casino.com', 0, 0),
(21, 'yacineh', 'yacineh@casino.com', 0, 0);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `vue_admins`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `vue_admins` (
`id` int(11)
,`pseudo` varchar(255)
,`email` varchar(255)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `vue_users`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `vue_users` (
`id` int(11)
,`pseudo` varchar(255)
,`email` varchar(255)
,`bannie` tinyint(1)
,`credit` int(11)
,`score` int(11)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `vue_users_no_data`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `vue_users_no_data` (
`id` int(11)
,`pseudo` varchar(255)
,`email` varchar(255)
);

-- --------------------------------------------------------

--
-- Structure de la vue `vue_admins`
--
DROP TABLE IF EXISTS `vue_admins`;

CREATE ALGORITHM=UNDEFINED DEFINER=`casino`@`%` SQL SECURITY DEFINER VIEW `vue_admins`  AS SELECT `u`.`id` AS `id`, `u`.`pseudo` AS `pseudo`, `u`.`email` AS `email` FROM `users` AS `u` WHERE `u`.`admin` = 1 ;

-- --------------------------------------------------------

--
-- Structure de la vue `vue_users`
--
DROP TABLE IF EXISTS `vue_users`;

CREATE ALGORITHM=UNDEFINED DEFINER=`casino`@`%` SQL SECURITY DEFINER VIEW `vue_users`  AS SELECT `u`.`id` AS `id`, `u`.`pseudo` AS `pseudo`, `u`.`email` AS `email`, `u`.`bannie` AS `bannie`, `d`.`credit` AS `credit`, `d`.`score` AS `score` FROM (`users` `u` join `data` `d` on(`u`.`id` = `d`.`idU`)) WHERE `u`.`admin` = 0 ;

-- --------------------------------------------------------

--
-- Structure de la vue `vue_users_no_data`
--
DROP TABLE IF EXISTS `vue_users_no_data`;

CREATE ALGORITHM=UNDEFINED DEFINER=`casino`@`%` SQL SECURITY DEFINER VIEW `vue_users_no_data`  AS SELECT `u`.`id` AS `id`, `u`.`pseudo` AS `pseudo`, `u`.`email` AS `email` FROM (`users` `u` left join `data` `d` on(`u`.`id` = `d`.`idU`)) WHERE `d`.`idU` is null AND `u`.`admin` = 0 ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`idU`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pseudo` (`pseudo`,`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `data`
--
ALTER TABLE `data`
  MODIFY `idU` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `data`
--
ALTER TABLE `data`
  ADD CONSTRAINT `data_ibfk_1` FOREIGN KEY (`idU`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
