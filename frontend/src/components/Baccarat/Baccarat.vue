<template>
    <img src="@/assets/img/ballons.svg" alt="" class="ballons-img">
    <img src="@/assets/img/pauvre.svg" alt="" class="pauvre-img">


    <div>
        <div class="texte-joueurs">Joueur<br><span id="score-joueurs"></span></div>
        <div class="main-joueurs"></div>
        <div class="texte-banque">Banque<br><span id="score-banque"></span></div>
        <div class="main-banque"></div>
    </div>
    <div class="baccarat-container">
        <div class="jetons">
            <a class="bouton-jeton" value="1"><img src="@/assets/img/jetons/1€.png" alt="jeton de 1€"></a>
            <a class="bouton-jeton" value="5"><img src="@/assets/img/jetons/5€.png" alt="jeton de 5€"></a>
            <a class="bouton-jeton" value="10"><img src="@/assets/img/jetons/10€.png" alt="jeton de 10€"></a>
            <a class="bouton-jeton" value="25"><img src="@/assets/img/jetons/25€.png" alt="jeton de 25€"></a>
            <a class="bouton-jeton" value="50"><img src="@/assets/img/jetons/50€.png" alt="jeton de 50€"></a>
            <a class="bouton-jeton" value="100"><img src="@/assets/img/jetons/100€.png" alt="jeton de 100€"></a>
            <a class="bouton-jeton" value="500"><img src="@/assets/img/jetons/500€.png" alt="jeton de 500€"></a>
            <a class="bouton-jeton" value="1000"><img src="@/assets/img/jetons/1000€.png" alt="jeton de 1000€"></a>
        </div>
        <div class="infos">
            <div class="mise-container">
                <p>Mise : <span id="mise">0</span></p>
            </div>
        </div>
        <div class="choix">
            <a class="joueurs"></a>
            <a class="egalite"></a>
            <a class="banque"></a>
            <img src="@/assets/img/Baccarat/choix.png" alt="Sélectionnez un choix" class="choix-img">
        </div>
    </div>
</template>

<style scoped>
    @keyframes monter {
        0% { transform: translateY(100vh); }
        100% { transform: translateY(-200vh); }
    }
    .ballons-img{
        position: absolute;
        display: none;
        z-index: 9999;
        transform: translateX(0);
        animation: monter 10s linear forwards;
    }
    .pauvre-img{
        position: absolute;
        display: none;
        z-index: 9999;
        transform: translateX(0);
        animation: monter 10s linear forwards;
    }
    .baccarat-container {
        background-image: url("@/assets/img/Baccarat/table.svg");
        background-size: 85% 85%;
        background-repeat: no-repeat;
        background-position: center;
        min-height: 100vh;
        display: flex;
    }
    .infos {
        position: absolute;
        left: 70%;
        bottom: 2%;
        font-weight: bold;
        color: rgb(255, 255, 255);
        font-size: 1.35rem;
    }
    .jetons {
        position: absolute;
        bottom: 2%;
        left: 2%;
    }
    .bouton-jeton img {
        width: 8%;
        height: auto;
        cursor: pointer;
    }
    .choix {
        position: absolute;
        top: 85%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .choix img {
        width: 120%;
        border-radius: 2%;
    }
    .joueurs{
        position: absolute;
        width: 37.6%;
        height: 94%;
        cursor: pointer;
        top: 1.2%;
        left: 0.6%;
    }
    .egalite{
        position: absolute;
        width: 40%;
        height: 82%;
        cursor: pointer;
        top: 13.8%;
        left: 39.9%;
        border-radius: 50% 50% 0 0;
    }
    .banque{
        position: absolute;
        width: 37.2%;
        height: 93%;
        cursor: pointer;
        top: 2%;
        left: 81.9%;
    }
    .texte-joueurs {
        position: absolute;
        text-align: center;
        display: none;
        color: rgb(255, 255, 255);
        background-color: rgb(59, 7, 117);
        font-weight: bold;
        font-size: 1.25rem;
        left: 37%;
        top: 53%;
        border-radius: 10%;
        width: 4.6%;
        height: 5%;
    }
    .texte-banque {
        position: absolute;
        text-align: center;
        display: none;
        color: rgb(255, 255, 255);
        background-color: rgb(59, 7, 117);
        font-weight: bold;
        font-size: 1.25rem;
        left: 37%;
        top: 18%;
        border-radius: 10%;
        width: 4.6%;
        height: 5%;
    }
    .main-joueurs {
        position: absolute;
        bottom: 22%;
        margin-left: 40%;
    }
    .main-banque {
        position: absolute;
        bottom: 57%;
        margin-left: 40%;
    }
    .mise-container {
        display: flex;
        align-items: center;
    }
</style>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useUserStore } from "@/stores/user";

    let userStore = useUserStore();
    let CarteJoueurs = ref([]);
    let CarteBanque = ref([]);
    let cartes = ref([]);
    let credits = ref(userStore.getCredit);
    let mise = ref(0);
    let choixJoueur;

    onMounted(() => {
        // Appliquer la mise
        const boutonsJetons = document.querySelectorAll('.bouton-jeton img');
        boutonsJetons.forEach(function (boutonJeton) {
            boutonJeton.addEventListener('click', function (event) {
                event.preventDefault();

                const valeurJeton = parseInt(boutonJeton.parentElement.getAttribute('value'));
                if (valeurJeton <= credits.value) {
                    mise.value += valeurJeton;
                    credits.value -= valeurJeton;
                    mettreAJourInformationsJeu();
                } else {
                    afficherPopupResultat("Vous n'avez pas assez de crédits pour placer une mise.");
                }
            });
        });

        // Fonction pour mettre à jour les informations du jeu
        function mettreAJourInformationsJeu() {
            document.getElementById('mise').textContent = mise.value;
            document.getElementById('score-joueurs').textContent = calculerValeurMain(CarteJoueurs.value);
            document.getElementById('score-banque').textContent = calculerValeurMain(CarteBanque.value);
            userStore.setCredit(credits.value);
        }

        // Fonction pour activer/désactiver les boutons de jeu
        function activerBoutonsJeu(mode) {
            const boutonJoueurs = document.querySelector('.joueurs');
            const boutonEgalite = document.querySelector('.egalite');
            const boutonBanque = document.querySelector('.banque');
            const boutonsJetons = document.querySelectorAll('.bouton-jeton');
            const texteJoueurs = document.querySelector('.texte-joueurs');
            const texteBanque = document.querySelector('.texte-banque');
            const choix = document.querySelector('.choix-img');
            const ballons = document.querySelector('.ballons-img');
            const pauvre = document.querySelector('.pauvre-img');

            switch (mode) {
                case 'initial':
                    // Affichage initial des éléments
                    boutonJoueurs.style.display = 'inline-block';
                    boutonEgalite.style.display = 'inline-block';
                    boutonBanque.style.display = 'inline-block';
                    boutonsJetons.forEach(bouton => bouton.style.display = 'inline');
                    texteJoueurs.style.display = 'none';
                    texteBanque.style.display = 'none';
                    choix.style.display = 'inline';
                    ballons.style.display = 'none';
                    pauvre.style.display = 'none';
                    break;
                case 'jeu':
                    // Affichage pendant le jeu
                    boutonJoueurs.style.display = 'none';
                    boutonEgalite.style.display = 'none';
                    boutonBanque.style.display = 'none';
                    boutonsJetons.forEach(bouton => bouton.style.display = 'none');
                    texteJoueurs.style.display = 'inline';
                    texteBanque.style.display = 'inline';
                    choix.style.display = 'none';
                    ballons.style.display = 'none';
                    pauvre.style.display = 'none';
                    break;
                case 'fin':
                    // Affichage à la fin du jeu sans gagnant ni perdant
                    boutonJoueurs.style.display = 'inline-block';
                    boutonEgalite.style.display = 'inline-block';
                    boutonBanque.style.display = 'inline-block';
                    boutonsJetons.forEach(bouton => bouton.style.display = 'inline');
                    choix.style.display = 'inline';
                    ballons.style.display = 'none';
                    pauvre.style.display = 'none';
                    break;
                case 'gagné':
                    // Affichage lorsque le joueur gagne
                    ballons.style.display = 'block';
                    pauvre.style.display = 'none';
                    break;
                case 'perdu':
                    // Affichage lorsque le joueur perd
                    ballons.style.display = 'none';
                    pauvre.style.display = 'block';
                    break;
            }
        }


        // Fonction pour créer un nouveau jeu de cartes
        function creerCartes() {
            const types = ['coeur', 'carreau', 'pique', 'trefle'];
            const valeurs = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

            for (let type of types) {
                for (let valeur of valeurs) {
                    cartes.value.push({ type, valeur });
                }
            }

            return cartes.value;
        }

        // Fonction pour mélanger le jeu de cartes
        function melangerCartes(cartes) {
            for (let i = cartes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cartes[i], cartes[j]] = [cartes[j], cartes[i]];
            }
            return cartes;
        }

        // Fonction pour distribuer les cartes
        function distribuerCartes(callback) {
            let valeurMainJoueur;
            let valeurMainBanque;
            let troisiemeCarteTirée = false;
            let valeurTroisiemeCarteJoueur;

            cartes.value = melangerCartes(creerCartes());
            CarteJoueurs.value = [cartes.value.pop()];
            CarteBanque.value = [cartes.value.pop()];

            afficherCarte(CarteJoueurs.value[0], true);
            setTimeout(() => {
                afficherCarte(CarteBanque.value[0], false);
                setTimeout(() => {
                    CarteJoueurs.value.push(cartes.value.pop());
                    afficherCarte(CarteJoueurs.value[1], true);
                    setTimeout(() => {
                        CarteBanque.value.push(cartes.value.pop());
                        afficherCarte(CarteBanque.value[1], false);
                        setTimeout(() => {
                            valeurMainJoueur = calculerValeurMain(CarteJoueurs.value);
                            valeurMainBanque = calculerValeurMain(CarteBanque.value);

                            if (determinerTroisiemeCarteJoueur(valeurMainJoueur)) {
                                setTimeout(() => {
                                    CarteJoueurs.value.push(cartes.value.pop());
                                    afficherCarte(CarteJoueurs.value[2], true);
                                    valeurMainJoueur = calculerValeurMain(CarteJoueurs.value);
                                    valeurTroisiemeCarteJoueur = CarteJoueurs.value[CarteJoueurs.value.length - 1].valeur;
                                    troisiemeCarteTirée = true;

                                    if (troisiemeCarteTirée) {
                                        setTimeout(() => {
                                            if (determinerTroisiemeCarteBanque(valeurMainBanque, valeurTroisiemeCarteJoueur)) {
                                                CarteBanque.value.push(cartes.value.pop());
                                                afficherCarte(CarteBanque.value[2], false);
                                                valeurMainBanque = calculerValeurMain(CarteBanque.value);
                                            }
                                            callback(valeurMainJoueur, valeurMainBanque);
                                        }, 1000);
                                    } else {
                                        callback(valeurMainJoueur, valeurMainBanque);
                                    }
                                }, 1000);
                            } else {
                                callback(valeurMainJoueur, valeurMainBanque);
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }

        // Fonction pour afficher une carte avec une animation
        function afficherCarte(carte, estJoueur) {
            const mainJoueursContainer = document.querySelector('.main-joueurs');
            const mainBanqueContainer = document.querySelector('.main-banque');

            const nouvelleCarteJoueur = document.createElement('div');
            nouvelleCarteJoueur.classList.add('carteFootball');
            nouvelleCarteJoueur.style.opacity = 1;
            nouvelleCarteJoueur.style.transform = 'translateY(-200%)';

            const nouvelleCarteBanque = document.createElement('div');
            nouvelleCarteBanque.classList.add('carteFootball');
            nouvelleCarteBanque.style.opacity = 1;
            nouvelleCarteBanque.style.transform = 'translateY(-200%)';

            const imageCarteJoueur = document.createElement('img');
            const imageCarteBanque = document.createElement('img');

            imageCarteJoueur.src = `src/assets/img/Cartes/${carte.valeur}_de_${carte.type}.jpg`;
            imageCarteBanque.src = `src/assets/img/Cartes/${carte.valeur}_de_${carte.type}.jpg`;

            imageCarteJoueur.alt = `${carte.valeur} de ${carte.type}`;
            imageCarteBanque.alt = `${carte.valeur} de ${carte.type}`;

            nouvelleCarteJoueur.appendChild(imageCarteJoueur);
            nouvelleCarteBanque.appendChild(imageCarteBanque);

            if (estJoueur) {
                mainJoueursContainer.appendChild(nouvelleCarteJoueur);
            } else {
                mainBanqueContainer.appendChild(nouvelleCarteBanque);
            }

            // Animation de glissement pour la nouvelle carte
            setTimeout(() => {
                nouvelleCarteJoueur.style.opacity = 1;
                nouvelleCarteJoueur.style.transform = 'translateX(0)';
                nouvelleCarteBanque.style.opacity = 1;
                nouvelleCarteBanque.style.transform = 'translateX(0)';
            }, 100);

            mettreAJourInformationsJeu();
        }

        // Fonction pour calculer la valeur d'une main
        function calculerValeurMain(main) {
        let valeur = 0;

        for (let carte of main) {
            let valeurCarte;
            if (carte.valeur === 'A') {
                valeurCarte = 1;
            } else if (['10', 'J', 'Q', 'K'].includes(carte.valeur)) {
                valeurCarte = 0;
            } else {
                valeurCarte = parseInt(carte.valeur);
            }
            valeur += valeurCarte;
        }

        if ((valeur > 9) && (valeur < 20)) {
            valeur -= 10;
        } else if (valeur >= 20) {
            valeur -= 20;
        }

        return valeur;
        }

        // Fonction pour déterminer si une troisième carte doit être distribuée
        function determinerTroisiemeCarteJoueur(valeurMainJoueur) {
            if (valeurMainJoueur >= 0 && valeurMainJoueur <= 5) {
                return true;
            }
            return false;
        }

        function determinerTroisiemeCarteBanque(valeurMainBanque, valeurTroisiemeCarteJoueur) {
            if (valeurMainBanque <= 2) {
                return true;
            } else if (valeurMainBanque === 3 && (valeurTroisiemeCarteJoueur <= 7 || valeurTroisiemeCarteJoueur === 9)) {
                return true;
            } else if (valeurMainBanque === 4 && (valeurTroisiemeCarteJoueur >= 2 && valeurTroisiemeCarteJoueur <= 7)) {
                return true;
            } else if (valeurMainBanque === 5 && (valeurTroisiemeCarteJoueur >= 4 && valeurTroisiemeCarteJoueur <= 7)) {
                return true;
            } else if (valeurMainBanque === 6 && (valeurTroisiemeCarteJoueur === 6 || valeurTroisiemeCarteJoueur === 7)) {
                return true;
            }
            return false;
        }

        // Fonction pour déterminer le gagnant
        function determinerGagnant(valeurMainJoueur, valeurMainBanque) {
            let resultat;
            console.log('valeur du joueur : '+valeurMainJoueur);
            console.log('valeur de la banque : '+valeurMainBanque);

            if (valeurMainJoueur > valeurMainBanque) {
                if (choixJoueur === 'JOUEURS') {
                    resultat = 'Vous avez gagné ! Vos crédits ont été crédités.';
                    credits.value += mise.value * 2;
                } else {
                    resultat = 'Vous avez perdu. Meilleure chance la prochaine fois !';
                }
            } else if (valeurMainJoueur < valeurMainBanque) {
                if (choixJoueur === 'BANQUE') {
                    resultat = 'Vous avez gagné ! Vos crédits ont été crédités.';
                    credits.value += Math.floor(mise.value * 0.95);
                } else {
                    resultat = 'Vous avez perdu. Meilleure chance la prochaine fois !';
                }
            } else {
                if (choixJoueur === 'EGALITE') {
                    resultat = 'Vous avez gagné ! Vos crédits ont été crédités.';
                    credits.value += mise.value * 8;
                } else {
                    resultat = 'Égalité. Votre mise vous est rendue.';
                    credits.value += mise.value;
                }
            }

            mise.value = 0;
            mettreAJourInformationsJeu();

            afficherPopupResultat(resultat);
            if (resultat === 'Vous avez gagné ! Vos crédits ont été crédités.'){
                setTimeout(function() {
                    setTimeout(function() {
                        activerBoutonsJeu('gagné');
                    }, 2000);

                    setTimeout(function() {
                        activerBoutonsJeu('fin');
                    }, 9000);
                })
            } else if (resultat === 'Vous avez perdu. Meilleure chance la prochaine fois !'){
                setTimeout(function() {
                    setTimeout(function() {
                        activerBoutonsJeu('perdu');
                    }, 2000);

                    setTimeout(function() {
                        activerBoutonsJeu('fin');
                    }, 9000);
                })
            } else {
                setTimeout(function() {
                        activerBoutonsJeu('fin');
                }, 1000);
            }
        }
            

        // Fonction pour afficher une popup
        function afficherPopupResultat(resultat) {
            const popupResultat = document.createElement('div');
            popupResultat.classList.add('resultat-popup');
            popupResultat.textContent = resultat;
            popupResultat.style.position = 'fixed';
            popupResultat.style.top = '50%';
            popupResultat.style.left = '50%';
            popupResultat.style.transform = 'translate(-50%, -50%)';
            popupResultat.style.color = '#fff';
            if (resultat == 'Vous avez gagné ! Vos crédits ont été crédités.'){
                popupResultat.style.backgroundColor = '#1d8010';
            }
            else {
                popupResultat.style.backgroundColor = '#270799';
            }
            popupResultat.style.padding = '45px';
            popupResultat.style.borderRadius = '10px';
            popupResultat.style.zIndex = '9999';
            popupResultat.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            document.body.appendChild(popupResultat);

            // Faire disparaître la pop-up après 3 secondes
            setTimeout(() => {
                popupResultat.classList.add('fondu');
                setTimeout(() => {
                    popupResultat.remove();
                }, 1000);
            }, 3000);
        }

        // Événements pour les choix du joueur
        const btnJoueurs = document.querySelector('.joueurs');
        const btnBanque = document.querySelector('.banque');
        const btnEgalite = document.querySelector('.egalite');

        btnJoueurs.addEventListener('click', function () {
            if (mise.value > 0) {
                choixJoueur = 'JOUEURS';
                activerBoutonsJeu('jeu');
                demarrerPartie();
            } else {
                afficherPopupResultat('Veuillez d\'abord choisir une mise.');
            }
        });

        btnBanque.addEventListener('click', function () {
            if (mise.value > 0) {
                choixJoueur = 'BANQUE';
            activerBoutonsJeu('jeu');
            demarrerPartie();
            } else {
            afficherPopupResultat('Veuillez d\'abord choisir une mise.');
            }
        });

        btnEgalite.addEventListener('click', function () {
            if (mise.value > 0) {
                choixJoueur = 'EGALITE';
                activerBoutonsJeu('jeu');
                demarrerPartie();
            } else {
                afficherPopupResultat('Veuillez d\'abord choisir une mise.');
            }
        });

        function demarrerPartie() {
            // Supprimer les cartes deja la
            const zoneJoueur = document.querySelector('.main-joueurs');
            const zoneCroupier = document.querySelector('.main-banque');
            zoneJoueur.innerHTML = '';
            zoneCroupier.innerHTML = '';

            distribuerCartes(function(valeurMainJoueur, valeurMainBanque) {
                determinerGagnant(valeurMainJoueur, valeurMainBanque);
            });
        }

        // Appel initial lors du chargement de la page
        window.onload = function() {
            activerBoutonsJeu('initial');
        }

        // Initialiser le jeu
        const jeuDeCartes = creerCartes();
        cartes.value = melangerCartes(jeuDeCartes);
    })
</script>