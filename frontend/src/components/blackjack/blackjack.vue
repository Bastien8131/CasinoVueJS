<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">

    <div class="blackjack-container">
        <div class="col-md-12">
            <div class="text-center texte-croupier"><span id="score-croupier"></span></div>
            <div class="main-croupier"></div>
            <div class="text-center texte-joueur"><span id="score-joueur"></span></div>
            <div class="main-joueur"></div>
        </div>
        <div class="col-md-5 jetons">
            <a class="bouton-jeton" value="1"><img src="@/assets/img/jetons/1€.png" alt="jeton de 1€"></a>
            <a class="bouton-jeton" value="5"><img src="@/assets/img/jetons/5€.png" alt="jeton de 5€"></a>
            <a class="bouton-jeton" value="10"><img src="@/assets/img/jetons/10€.png" alt="jeton de 10€"></a>
            <a class="bouton-jeton" value="25"><img src="@/assets/img/jetons/25€.png" alt="jeton de 25€"></a>
            <a class="bouton-jeton" value="50"><img src="@/assets/img/jetons/50€.png" alt="jeton de 50€"></a>
            <a class="bouton-jeton" value="100"><img src="@/assets/img/jetons/100€.png" alt="jeton de 100€"></a>
            <a class="bouton-jeton" value="500"><img src="@/assets/img/jetons/500€.png" alt="jeton de 500€"></a>
            <a class="bouton-jeton" value="1000"><img src="@/assets/img/jetons/1000€.png" alt="jeton de 1000€"></a>
        </div>
        <div class="col-md-7 infos text-center d-flex justify-content-center">
            <a id="doubler-btn" style="display: none;"><img src="@/assets/img/Blackjack/double.png" alt="DOUBLE" class="bouton-img"></a>
            <a id="tirer-btn" style="display: none;"><img src="@/assets/img/Blackjack/hit.png" alt="HIT" class="bouton-img"></a>
            <a id="rester-btn" style="display: none;"><img src="@/assets/img/Blackjack/stand.png" alt="STAND" class="bouton-img"></a>
            <a id="donner-btn"><img src="@/assets/img/Blackjack/deal.png" alt="DEAL" class="bouton-img"></a>
            <div>
                <p>Crédits : <span id="credits">10000</span></p>
                <p>Mise : <span id="mise">0</span></p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    let mainJoueur = ref([]);
    let mainCroupier = ref([]);
    let cartes = ref([]);
    let credits = ref(10000);
    let mise = ref(0);

    onMounted(() => {
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
        function melangerCartes() {
            for (let i = cartes.value.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cartes.value[i], cartes.value[j]] = [cartes.value[j], cartes.value[i]];
            }
            return cartes.value;
        }

        // Fonction pour calculer la valeur d'une main
        function calculerValeurMain(main, montrerCartesCachees = true) {
            let valeur = 0;
            let as = false;

            for (let i = 0; i < main.length; i++) {
                const carte = main[i];
                if (i === 1 && !montrerCartesCachees && main.length > 1) {
                    continue; // Ignorer la deuxième carte si elle est cachée
                }
                if (carte.valeur === 'A') {
                    as = true;
                    valeur += 11;
                } else if (['K', 'Q', 'J'].includes(carte.valeur)) {
                    valeur += 10;
                } else {
                    valeur += parseInt(carte.valeur);
                }
            }

            if (as && valeur > 21) {
                valeur -= 10;
            }

            return valeur;
        }

        // Fonction pour distribuer une nouvelle carte
        function distribuer(main) {
            const carte = cartes.value.pop();
            main.push(carte);
            return carte;
        }

        // Fonction pour afficher les cartes
        function afficherMain(main, zoneCartes, cacherDeuxiemeCarte, delaiAnimation = 0) {
            const cartesExistantes = zoneCartes.querySelectorAll('.carte');

            // Supprimer la dernière carte si elle existe et que ce n'est pas la carte cachée du croupier
            if (cartesExistantes.length > main.length && !(cacherDeuxiemeCarte && cartesExistantes.length === 2)) {
                cartesExistantes[cartesExistantes.length - 1].remove();
            }

            // Ajouter la nouvelle carte si nécessaire
            if (main.length > cartesExistantes.length) {
                const nouvelleCarteIndex = main.length - 1;
                const carte = main[nouvelleCarteIndex];
                const elementCarte = document.createElement('div');
                elementCarte.classList.add('carte');
                elementCarte.style.opacity = 0;
                elementCarte.style.transform = 'translateX(-100%)';

                const imageCarte = document.createElement('img');
                if (cacherDeuxiemeCarte && nouvelleCarteIndex === 1) {
                    imageCarte.src = 'src/assets/img/Blackjack/dos_carte.png';
                    imageCarte.alt = "Dos de la carte";
                } else {
                    imageCarte.src = `src/assets/img/Blackjack/cartes/${carte.valeur}_de_${carte.type}.jpg`;
                    imageCarte.alt = `${carte.valeur} de ${carte.type}`;
                }
                elementCarte.appendChild(imageCarte);
                zoneCartes.appendChild(elementCarte);

                // Animation de glissement pour la nouvelle carte
                setTimeout(() => {
                    elementCarte.style.opacity = 1;
                    elementCarte.style.transform = 'translateX(0)';
                }, delaiAnimation);
            }

            // Retourner la carte cachée du croupier
            if (!cacherDeuxiemeCarte && cartesExistantes.length === 2) {
                const carteCacheeElement = cartesExistantes[1];
                const imageCarteCachee = carteCacheeElement.querySelector('img');
                const carte = main[1];
                imageCarteCachee.src = `src/assets/img/Blackjack/cartes/${carte.valeur}_de_${carte.type}.jpg`;
                imageCarteCachee.alt = `${carte.valeur} de ${carte.type}`;
            }
        }

        // Fonction pour mettre à jour les scores
        function mettreAJourInformationsJeu() {
            let montrerCartesCachees = true;
            // Vérifier si la deuxième carte du croupier est cachée ou révélée
            if (mainCroupier.value.length <= 1 || (mainCroupier.value.length === 2 && !croupierJoue.value)) {
                montrerCartesCachees = false;
            }

            // Mettre à jour le score du joueur
            document.getElementById('score-joueur').textContent = calculerValeurMain(mainJoueur.value);

            // Mettre à jour le score du croupier
            if (croupierJoue.value && mainCroupier.value.length > 0) {
                // Afficher uniquement la valeur de la 1ere carte car la 2e carte est face cachée
                document.getElementById('score-croupier').textContent = mainCroupier.value[0].valeur === 'A' ? 11 : (isNaN(parseInt(mainCroupier.value[0].valeur)) ? 10 : parseInt(mainCroupier.value[0].valeur));
            } else {
                document.getElementById('score-croupier').textContent = calculerValeurMain(mainCroupier.value, montrerCartesCachees);
            }

            document.getElementById('credits').textContent = credits.value;
            document.getElementById('mise').textContent = mise.value;
        }

        // Fonction pour activer/désactiver les boutons de jeu
        function activerBoutonsJeu(activer) {
            const boutonDoubler = document.getElementById('doubler-btn');
            const boutonTirer = document.getElementById('tirer-btn');
            const boutonRester = document.getElementById('rester-btn');
            const boutonDonner = document.getElementById('donner-btn');
            const boutonsJetons = document.querySelectorAll('.bouton-jeton');

            boutonDoubler.disabled = !activer;
            boutonTirer.disabled = !activer;
            boutonRester.disabled = !activer;
            boutonDonner.disabled = activer;

            if (activer) {
                boutonDoubler.style.display = 'inline-block';
                boutonTirer.style.display = 'inline-block';
                boutonRester.style.display = 'inline-block';
                boutonDonner.style.display = 'none';
                boutonsJetons.forEach(bouton => bouton.style.display = 'none');
            } else {
                boutonDoubler.style.display = 'none';
                boutonTirer.style.display = 'none';
                boutonRester.style.display = 'none';
                boutonDonner.style.display = 'inline-block';
                boutonsJetons.forEach(bouton => bouton.style.display = 'inline');
            }
        }

        // Pour le bouton "Doubler"
        const doublerBtn = document.getElementById('doubler-btn');
        doublerBtn.addEventListener('click', function() {
            if (mainJoueur.value.length === 2 && credits.value >= mise.value) {
                credits.value -= mise.value;
                mise.value *= 2;
                distribuer(mainJoueur.value);
                afficherMain(mainJoueur.value, document.querySelector('.main-joueur'), false);
                mettreAJourInformationsJeu();
                activerBoutonsJeu(false);
                jouerCroupier();
            } else if (credits.value < mise.value) {
                alert("Vous n'avez pas assez de crédits pour doubler votre mise.");
            } else {
                alert("Vous ne pouvez doubler que si vous avez seulement deux cartes.");
            }
        });


        // Pour le bouton "Tirer"
        const tirerBtn = document.getElementById('tirer-btn');
        tirerBtn.addEventListener('click', function() {
            distribuer(mainJoueur.value);
            afficherMain(mainJoueur.value, document.querySelector('.main-joueur'), false);
            mettreAJourInformationsJeu();
            if (calculerValeurMain(mainJoueur.value) > 21) {
                terminerPartie();
            }
        });

        // Pour le bouton "Rester"
        const resterBtn = document.getElementById('rester-btn');
        resterBtn.addEventListener('click', function() {
            // Retourner la deuxième carte du croupier
            afficherMain(mainCroupier.value, document.querySelector('.main-croupier'), false);

            jouerCroupier();
        });

        // Pour le bouton "Donner"
        const donnerBtn = document.getElementById('donner-btn');
        donnerBtn.addEventListener('click', function() {
        if (mise.value > 0) {
            demarrerPartie();
        } else {
            alert("Veuillez d'abord sélectionner une mise.");
        }
        });

        // Appliquer la mise
        const boutonsJetons = document.querySelectorAll('.bouton-jeton img');
        boutonsJetons.forEach(function(boutonJeton) {
            boutonJeton.addEventListener('click', function(event) {
                event.preventDefault();

                const valeurJeton = parseInt(boutonJeton.parentElement.getAttribute('value'));
                if (valeurJeton <= credits.value) {
                    mise.value += valeurJeton;
                    credits.value -= valeurJeton;
                    mettreAJourInformationsJeu();
                } else {
                    alert("Vous n'avez pas assez de crédits pour placer une mise.");
                }
            });
        });

        let croupierJoue = ref(false); // pour savoir si le croupier est en train de jouer ou pas
        let delaiAnimation = ref(500);

        // Fonction pour gérer le jeu du croupier
        function jouerCroupier() {
            activerBoutonsJeu(false);
            croupierJoue.value = true;

            const zoneCroupier = document.querySelector('.main-croupier');

            (function prendreCarteCroupier() {
                if (calculerValeurMain(mainCroupier.value) < 17) {
                    distribuer(mainCroupier.value);
                    afficherMain(mainCroupier.value, zoneCroupier, false, delaiAnimation.value);
                    mettreAJourInformationsJeu();
                    delaiAnimation.value += 500;
                    setTimeout(prendreCarteCroupier, 500);
                } else {
                    croupierJoue.value = false;
                    afficherMain(mainCroupier.value, zoneCroupier, false); // Retourner la carte cachée du croupier
                    setTimeout(terminerPartie, 1000); // Appeler terminerPartie après un délai de 1000 ms
                }
            })();
        }

        function afficherPopupResultat(resultat) {
            const popupResultat = document.createElement('div');
            popupResultat.classList.add('resultat-popup');
            popupResultat.textContent = resultat;
            popupResultat.style.position = 'fixed';
            popupResultat.style.top = '50%';
            popupResultat.style.left = '50%';
            popupResultat.style.transform = 'translate(-50%, -50%)';
            popupResultat.style.backgroundColor = '#333';
            popupResultat.style.color = '#fff';
            popupResultat.style.padding = '20px';
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

        // Fonction pour terminer la partie et donner le résultat
        function terminerPartie() {
            activerBoutonsJeu(false); // Désactiver les boutons de jeu
            const scoreJoueur = calculerValeurMain(mainJoueur.value);
            const scoreCroupier = calculerValeurMain(mainCroupier.value);

            let resultat;
            if (scoreJoueur > 21 || (scoreCroupier <= 21 && scoreCroupier > scoreJoueur)) {
                // Le joueur a perdu
                resultat = "Vous avez perdu !";
                // Désactiver les boutons "Tirer" et "Rester" après avoir perdu
                document.getElementById('tirer-btn').disabled = true;
                document.getElementById('rester-btn').disabled = true;
            } else if (scoreJoueur === scoreCroupier) {
                // Match nul, récupérer la mise
                credits.value += mise.value;
                resultat = "Match nul, votre mise vous a été remboursée";
            } else {
                // Le joueur a gagné
                credits.value += mise.value * 2;
                resultat = "Vous avez gagné !";
            }

            afficherPopupResultat(resultat);

            mise.value = 0;
            mettreAJourInformationsJeu();
        }

        // Commencer une nouvelle partie
        function demarrerPartie() {
            mainJoueur.value = [];
            mainCroupier.value = [];
            cartes.value = creerCartes();
            melangerCartes();

            // Supprimer les cartes deja la
            const zoneJoueur = document.querySelector('.main-joueur');
            const zoneCroupier = document.querySelector('.main-croupier');
            zoneJoueur.innerHTML = '';
            zoneCroupier.innerHTML = '';

            // Distribution avec des animations
            distribuer(mainJoueur.value);
            afficherMain(mainJoueur.value, zoneJoueur, false, 500);
            distribuer(mainJoueur.value);
            afficherMain(mainJoueur.value, zoneJoueur, false, 1000);

            distribuer(mainCroupier.value);
            afficherMain(mainCroupier.value, zoneCroupier, false, 1500);
            distribuer(mainCroupier.value);
            afficherMain(mainCroupier.value, zoneCroupier, true, 2000);

            mettreAJourInformationsJeu();

            activerBoutonsJeu(true);
        }

        // Initialiser le jeu
        creerCartes();
        melangerCartes();
    })
</script>

<style scoped>
    .blackjack-container {
        background-image: url("@/assets/img/Blackjack/table.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    a {
        cursor: pointer;
    }
    .resultat-popup {
        transition: opacity 1s ease-in-out;
    }
    .fondu {
        opacity: 0;
    }
    .main-joueur {
        position: absolute;
        left: 42%;
        bottom: 22%;
    }
    .main-croupier {
        position: absolute;
        left: 42%;
        bottom: 56%;
    }
    .texte-joueur {
        color: rgb(255, 255, 255);
        background-color: rgb(79, 26, 179);
        font-weight: bold;
        font-size: 1.75rem;
        margin-left: 38%;
        margin-top: 14%;
        border-radius: 20%;
        width: 2.7%;
        height: 1.5%;
    }
    .texte-croupier {
        color: rgb(255, 255, 255);
        background-color: rgb(79, 26, 179);
        font-weight: bold;
        font-size: 1.75rem;
        margin-left: 38%;
        margin-top: 9%;
        border-radius: 20%;
        width: 2.7%;
        height: 1.5%;
    }
    .jetons {
        position: absolute;
        bottom: 2%;
        left: 2%;
    }
    .bouton-jeton img {
        width: 8%;
        height: auto;
    }
    .infos {
        position: absolute;
        left: 29%;
        bottom: 2%;
        font-weight: bold;
        color: rgb(255, 255, 255);
        font-size: 1.35rem;
    }
    .bouton-img {
        width: 70%;
        height: auto;
        padding: 1%;
    }
</style> 