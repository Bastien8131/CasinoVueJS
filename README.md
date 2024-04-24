# CasinoVueJS

Liste des membres du groupe :
- Bastien BORIES
- Yacine HABBAK
- Bastien MEZIERE

## Ce repositories contient dans deux dossiers séparés le backend (NodeJS) et le frontend (VueJS).

La racine du projet, contient 2 dossier `backend` et `frontend`, pour naviguer vers ces dossiers il suffit de faire `cd`, et pour revenir en arriere il suffit de faire `cd ../`.

Avant de démarrer quoi que ce soit il va falloir d'abord faire `npm install`.
```
cd backend
npm install

cd frontend
npm install
```

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
- Gestion administrateur : Permet aux administrateurs d'accéder à un tableau de bord spécial pour gérer les utilisateurs
- Jeu Roulette : Propose un jeu de roulette classique où le joueur place un pari sur un numéro
- Jeu BlackJack : Propose le jeu de carte BlackJack où le joueur doit battre le croupier en obtenant une main dont la valeur est plus proche de 21 sans la dépasser.
- Jeu Machine à sous : Simule l'expérience d'une machine à sous de casino où le joueur peut miser puis appuyer sur un bouton qui lance 3 images aléatoires dont le but est qu'elles doivent identiques
- Jeu Football Studio : ?
- Jeu Baccarat : Fournit le jeu de cartes Baccarat, où le joueur parie sur le résultat de la comparaison entre les mains du banquier et du joueur.
