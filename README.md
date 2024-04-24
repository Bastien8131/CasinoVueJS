# CasinoVueJS

Liste des membres du groupe :
- Bastien BORIES
- Yacine HABBAK
- Bastien MEZIERE

## Table des Matières
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Démarrage](#démarrage)
4. [Structure du Projet](#structure-du-projet)
5. [Utilisation](#utilisation)

# introduction

Cette application est divisée en 2 parties. La première partie est la section casino, qui se trouve sur le port `5173`. Cette partie de l'application n'est accessible qu'aux utilisateurs. C'est là que l'on trouvera les différents jeux du site.

La deuxième partie est la section de gestion administrative, qui se trouve sur le port `5170`. Cette partie n'est accessible qu'aux administrateurs et permet la gestion des utilisateurs du casino. Dans cette interface, les administrateurs pourront notamment bannir ou débannir des utilisateurs, voire supprimer des comptes.

# installation

## Ce repositories contient dans deux dossiers séparés le backend (NodeJS) et le frontend (VueJS).

La racine du projet, contient 2 dossier `backend` et `frontend`, pour naviguer vers ces dossiers il suffit de faire `cd`, et pour revenir en arriere il suffit de faire `cd ../`.

Avant de démarrer quoi que ce soit il va falloir d'abord faire `npm install`.
```
cd backend
npm install

cd frontend
npm install
```
# démarrage

Pour demarrer le frontend (VueJS) :

```
cd frontend
npm run dev
```
Port du front-end : 5173 où l'on retrouve le jeu casino

Et pour demarrer le backend (NodeJS) :
> Par defaut le serveur demarrera avec `nodemon`, il se relancera dès qu'une modification sera effectuée .

```
cd backend
npm run start
```
Port du back-end : 5170 où l'on retrouve la gestion administrateur

# structure-du-projet

## Les pages du projet
- Page par défaut : La page de connexion qui permet de se connecter avec son compte au site de casino
- Page d'inscription : Permet de s'inscrire en tant que nouvel utilisateur
- Page d'accueil : Accueil où l'on retrouve le menu burger, les crédits de l'utilisateur, la possibilité d'acheter des crédits et le fait de pouvoir choisir un des 3 jeux principaux entre : la machine à sous, la roulette et le blackjack si on clique sur l'image correspondante
- Page roulette : Jeu de la roulette
- Page Blackjack : Jeu du Blackjack
- Page Machine à sous : Jeu de la machine à sous
- Page Football Studio : Jeu du Football studio
- Page Baccarat : Jeu du Baccarat

## Les fonctionnalités principales du projet

- Inscription : Permet aux utilisateurs de créer un compte en fournissant leur pseudo et leur e-mail
- Connexion : Permet aux utilisateurs déjà inscris de se connecter à leur compte pour pouvoir accéder au site du casino
- Gestion administrateur : Permet aux administrateurs d'accéder à un tableau de bord spécial pour gérer les utilisateurs, un administrateur pourra soit bannir / debannir, soit supprimer des comptes.
- Jeu Roulette : Propose un jeu de roulette classique où le joueur place un pari sur un numéro
- Jeu BlackJack : Propose le jeu de carte BlackJack où le joueur doit battre le croupier en obtenant une main dont la valeur est plus proche de 21 sans la dépasser.
- Jeu Machine à sous : Simule l'expérience d'une machine à sous de casino où le joueur peut miser puis appuyer sur un bouton qui lance 3 images aléatoires dont le but est qu'elles doivent identiques
- Jeu Football Studio : ?
- Jeu Baccarat : Fournit le jeu de cartes Baccarat, où le joueur parie sur le résultat de la comparaison entre les mains du banquier et du joueur.

# utilisation

## Description des Routes API

Cette section décrit les différentes routes de l'API et leurs fonctionnalités au sein de l'application, utilisant Express et Socket.IO pour gérer les communications en temps réel et les requêtes HTTP standard. Les différentes routes se situent dans le fichier `backend/server.js`

### Routes WebSocket (Socket.IO)

- **Connexion & Déconnexion** :
  - **À la connexion** : Enregistre la connexion et capture l'ID du socket lorsqu'un utilisateur se connecte via WebSocket.
  - **À la déconnexion** : Vérifie si l'utilisateur est connecté, met à jour son crédit et son score dans la base de données, et le retire de la liste des utilisateurs connectés.

- **Login** :
  - Écoute les tentatives de connexion. Valide les champs nécessaires (pseudo, email), vérifie dans la base de données pour l'authentification, et si l'utilisateur est valide et non banni ou administrateur, l'ajoute à la liste des utilisateurs connectés.

- **Mise à jour** :
  - Permet à un utilisateur connecté de mettre à jour son score et son crédit, qui sont ensuite reflétés dans la liste `usersLoggued`.

- **Test** :
  - Un simple écouteur pour les tests de connectivité, enregistrant un message de test sur la console du serveur.

### Routes HTTP (Express)

- **POST /admin/login** :
  - Permet à un administrateur de se connecter en vérifiant ses identifiants (pseudo, email) contre la vue `vue_admins` de la base de données. Renvoie les détails de l'administrateur en cas de succès.

- **POST /register** :
  - Gère l'enregistrement de nouveaux utilisateurs avec pseudo et email, et initialise leurs données (crédit, score) dans la base de données.

- **POST /logout** :
  - Gère la déconnexion d'un utilisateur en mettant à jour ses données dans la base de données et en le retirant de la liste des utilisateurs connectés.

- **POST /update** :
  - Met à jour les données (crédit, score) d'un utilisateur spécifique et synchronise ces changements avec la liste des utilisateurs connectés.

- **POST /show** :
  - Renvoie une liste de tous les utilisateurs actuellement connectés.

- **POST /users** :
  - Interroge et renvoie tous les utilisateurs depuis une vue spécifique de la base de données.

- **POST /api/user/ban** :
  - Permet de bannir un utilisateur en changeant son statut et en mettant à jour ses données (crédit, score).

- **POST /admin/user/del** :
  - Supprime les données d'un utilisateur de la base de données si l'utilisateur n'est pas actuellement connecté.

Cette section de la documentation offre une compréhension claire des fonctionnalités disponibles et de la manière dont elles sont gérées au sein de l'application.

## Librairies JavaScript

Cette section détaille les librairies JavaScript installées dans les parties backend et frontend de l'application. Chaque librairie joue un rôle crucial dans la fonctionnalité de l'application.

### Librairies du Backend

Le backend de l'application se trouve dans le répertoire `backend` et utilise les librairies suivantes :

- **cors@2.8.5**
  - Utilisée pour activer le partage de ressources d'origine croisée (CORS) avec différentes options, permettant au backend d'accepter les requêtes de différents domaines.

- **express@4.19.2**
  - Un framework web rapide, non opinionné et minimaliste pour Node.js, utilisé pour gérer les requêtes HTTP et les middlewares.

- **mysql@2.18.1**
  - Un pilote Node.js pour MySQL. Écrit en JavaScript, il ne nécessite pas de compilation et est utilisé pour interagir avec les bases de données MySQL.

- **socket.io@4.7.5**
  - Permet une communication événementielle bidirectionnelle en temps réel entre les clients web et le serveur.

### Librairies du Frontend

Le frontend de l'application est situé dans le répertoire `frontend` et inclut ces librairies :

- **@vitejs/plugin-vue@5.0.4**
  - Un plugin officiel pour le support de Vue 3 dans Vite, l'outil de nouvelle génération pour le développement frontend.

- **axios@1.6.8**
  - Un client HTTP basé sur les promesses pour le navigateur et node.js, utilisé pour effectuer des requêtes HTTP du frontend vers le backend.

- **pinia@2.1.7**
  - La bibliothèque de gestion d'état officiellement recommandée pour Vue.js, offrant un magasin centralisé pour tous les composants d'une application.

- **socket.io-client@4.7.5**
  - La bibliothèque côté client de Socket.IO, utilisée pour se connecter au serveur Socket.IO depuis le frontend.

- **vite@5.2.8**
  - Un outil de construction frontend moderne qui offre une expérience de développement plus rapide et plus épurée pour les projets web modernes.

- **vue@3.4.21**
  - Le framework JavaScript progressif utilisé pour construire des interfaces utilisateur, spécifiquement ciblé sur la création d'applications web riches en une seule page.

Ces librairies contribuent significativement au développement et à l'opération de l'application, assurant une performance efficace et évolutive.

## Base de donnée

Pour ce projet, nous avons utilisé un serveur distant pour y stocker la base de données. Pour des raisons de sécurité, je peux pas fournir ici les logins d'identification En revanche, j'ai mis à disposition à la racine du projet, le fichier SQL de la base de données.

