<template>
	<img src="@/assets/img/ballons.svg" alt="" class="ballons-img">
    <img src="@/assets/img/pauvre.svg" alt="" class="pauvre-img">

	<div class="football-container">
		<div class="col-md-12">
			<div class="main-croupier">
				<img class="carte-locaux" src="" alt="">
				<img class="carte-visiteurs" src="" alt="">
			</div>
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
            <div class="mise-container">
                <p>Mise : <span id="mise">0</span></p>
            </div>
		</div>
		<div class="choix">
			<a class="locaux"></a>
			<a class="egalite"></a>
			<a class="visiteurs"></a>
			<img src="@/assets/img/FootballStudio/choix.png" alt="Sélectionnez un choix" class="choix-img">
		</div>
	</div>
</template>

<style scoped>
    @keyframes monter {
        0% { transform: translateY(100vh); }
        100% { transform: translateY(-200vh); }
    }
    .ballons-img,.pauvre-img{
        position: absolute;
        display: none;
        z-index: 9999;
        transform: translateX(0);
        animation: monter 10s linear forwards;
    }
	.football-container {
		background-image: url("@/assets/img/FootballStudio/table.png");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		height: 100vh;
		overflow: hidden;
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
	.infos {
		position: absolute;
		left: 50%;
		bottom: 2%;
		font-weight: bold;
		color: rgb(255, 255, 255);
		font-size: 1.35rem;
	}
	.carte-locaux, .carte-visiteurs {
		position: absolute;
		width: 10%;
		transition: transform 1s, opacity 1s;
	}
	.carte-locaux {
		border-radius: 10%;
		width: 6%;
		left: 40%;
		bottom: 58%;
		transform: translateX(-200%);
	}
	.carte-visiteurs {
		border-radius: 10%;
		width: 6%;
		right: 40%;
		bottom: 58%;
		transform: translateX(200%);
	}
	.choix {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.choix img {
		width: 100%;
		border-radius: 2%;
	}
	.locaux{
		position: absolute;
		width: 38%;
		height: 98%;
		cursor: pointer;
	}
	.egalite{
		position: absolute;
		width: 25%;
		height: 70%;
		top: 15%;
		left: 37.5%;
		border-radius: 50%;
		cursor: pointer;
	}
	.visiteurs{
		position: absolute;
		width: 38%;
		height: 98%;
		left: 61.9%;
		cursor: pointer;
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
					afficherPopup("Vous n'avez pas assez de crédits pour placer une mise.");
				}
			});
		});


		// Fonction pour activer/désactiver les boutons de jeu
		function activerBoutonsJeu(mode) {
			const boutonLocaux = document.querySelector('.locaux');
			const boutonEgalite = document.querySelector('.egalite');
			const boutonVisiteurs = document.querySelector('.visiteurs');
			const boutonsJetons = document.querySelectorAll('.bouton-jeton');
			const boutonChoix = document.querySelector('.choix-img');
			const ballons = document.querySelector('.ballons-img');
            const pauvre = document.querySelector('.pauvre-img');


			switch (mode) {
                case 'initial':
                    // Affichage initial des éléments
					boutonLocaux.style.display = 'inline-block';
					boutonEgalite.style.display = 'inline-block';
					boutonVisiteurs.style.display = 'inline-block';
					boutonChoix.style.display = 'inline-block';
					boutonsJetons.forEach(bouton => bouton.style.display = 'inline');
                    ballons.style.display = 'none';
                    pauvre.style.display = 'none';
                    break;
				case 'jeu':
                    // Affichage pendant le jeu
					boutonLocaux.style.display = 'none';
					boutonEgalite.style.display = 'none';
					boutonVisiteurs.style.display = 'none';
					boutonChoix.style.display = 'none';
					boutonsJetons.forEach(bouton => bouton.style.display = 'none');
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
		function distribuerCartes() {
			const cartesDistribuees = melangerCartes(creerCartes()).slice(0, 2);
			CarteJoueurs = cartesDistribuees[0];
			CarteBanque = cartesDistribuees[1];

			const CarteJoueursImg = document.querySelector('.carte-locaux');
			const CarteBanqueImg = document.querySelector('.carte-visiteurs');

			// Animer la disparition des anciennes cartes
			CarteJoueursImg.style.transform = 'translateX(-200%)';
			CarteBanqueImg.style.transform = 'translateX(200%)';
			CarteJoueursImg.style.opacity = 0;
			CarteBanqueImg.style.opacity = 0;

			// Attendre la fin de l'animation de disparition
			setTimeout(() => {
				// Réinitialiser les anciennes cartes
				CarteJoueursImg.src = '';
				CarteJoueursImg.alt = '';
				CarteBanqueImg.src = '';
				CarteBanqueImg.alt = '';

				// Réinitialiser la position des cartes
				CarteJoueursImg.style.transform = 'translateX(-200%)';
				CarteBanqueImg.style.transform = 'translateX(200%)';

				// Animer l'apparition des nouvelles cartes
				setTimeout(() => {
					CarteJoueursImg.src = `src/assets/img/Cartes/${CarteJoueurs.valeur}_de_${CarteJoueurs.type}.jpg`;
					CarteBanqueImg.src = `src/assets/img/Cartes/${CarteBanque.valeur}_de_${CarteBanque.type}.jpg`;
					CarteJoueursImg.style.opacity = 1;
					CarteBanqueImg.style.opacity = 1;

					CarteJoueursImg.style.transform = 'translateX(0)';
					CarteBanqueImg.style.transform = 'translateX(0)';
				}, 500);
			}, 500);

			CarteJoueursImg.addEventListener('transitionend', () => {
				CarteJoueursImg.style.transform = 'rotateX(30deg)';
			});

			CarteBanqueImg.addEventListener('transitionend', () => {
				CarteBanqueImg.style.transform = 'rotateX(30deg)';
			});
		}
		

		// Fonction pour déterminer le gagnant
		function determinerGagnant() {
			let resultat;
			const valeursCartes = {
				'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': 11
			};
		
			const valeurCarteJoueurs = valeursCartes[CarteJoueurs.valeur];
			const valeurCarteBanque = valeursCartes[CarteBanque.valeur];
		
			let gagnant;
			if (valeurCarteJoueurs > valeurCarteBanque) {
				gagnant = 'LOCAUX';
			} else if (valeurCarteJoueurs < valeurCarteBanque) {
				gagnant = 'VISITEURS';
			} else {
				gagnant = 'EGALITE';
			}
		
			if (choixJoueur === gagnant) {
				resultat = 'Vous avez gagné ! Vos crédits ont été crédités.';

				if (choixJoueur === 'EGALITE'){
					credits.value += mise.value*12;
				} else {
					credits.value += mise.value*2;
				}
			} else {
				if (gagnant === 'EGALITE'){
					resultat = 'Vous avez perdu. Mais il y\'a Egalité ! On vous rembourse la moitié de votre mise.' ;
					credits.value += mise.value/2;
				} else {
					resultat = 'Vous avez perdu. Meilleure chance la prochaine fois !';
				}
			}

			mise.value = 0;
			mettreAJourInformationsJeu();
			afficherPopup(resultat);
            if (resultat === 'Vous avez gagné ! Vos crédits ont été crédités.'){
                setTimeout(function() {
                    setTimeout(function() {
                        activerBoutonsJeu('gagné');
                    }, 2000);

                    setTimeout(function() {
                        activerBoutonsJeu('initial');
                    }, 9000);
                })
            } else if (resultat === 'Vous avez perdu. Meilleure chance la prochaine fois !'){
                setTimeout(function() {
                    setTimeout(function() {
                        activerBoutonsJeu('perdu');
                    }, 2000);

                    setTimeout(function() {
                        activerBoutonsJeu('initial');
                    }, 9000);
                })
            } else {
                setTimeout(function() {
                        activerBoutonsJeu('initial');
                }, 1000);
            }
		
			mise.value = 0;
		}
		

		// Fonction pour mettre à jour les informations du jeu
		function mettreAJourInformationsJeu() {
			document.getElementById('mise').textContent = mise.value;

			userStore.setCredit(credits.value);
		}
		

		// Fonction pour afficher une popup
		function afficherPopup(resultat) {
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
            else if (resultat == 'Vous avez perdu. Meilleure chance la prochaine fois !'){
                popupResultat.style.backgroundColor = '#ff0000';
            }
            else {
                popupResultat.style.backgroundColor = '#270799';
            }
            popupResultat.style.padding = '45px';
			popupResultat.style.borderRadius = '10px';
			popupResultat.style.zIndex = '9999';
			popupResultat.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
			document.body.appendChild(popupResultat);
		
			setTimeout(() => {
				popupResultat.classList.add('fondu');
				setTimeout(() => {
					popupResultat.remove();
				}, 1000);
			}, 3000);
		}
		
		// evenements pour les choix du joueur
		const btnLocaux = document.querySelector('.locaux');
		const btnVisiteurs = document.querySelector('.visiteurs');
		const btnEgalite = document.querySelector('.egalite');

		btnLocaux.addEventListener('click', function () {
			if (mise.value > 0) {
				choixJoueur = 'LOCAUX';
				demarrerPartie();
			} else {
				afficherPopup('Veuillez d\'abord choisir une mise.');
				return;
			}
		});

		btnVisiteurs.addEventListener('click', function () {
			if (mise.value > 0) {
				choixJoueur = 'VISITEURS';
				demarrerPartie();
			} else {
				afficherPopup('Veuillez d\'abord choisir une mise.');
				return;
			}
		});

		btnEgalite.addEventListener('click', function () {
			if (mise.value > 0) {
				choixJoueur = 'EGALITE';
				demarrerPartie();
			} else {
				afficherPopup('Veuillez d\'abord choisir une mise.');
				return;
			}
		});


		function demarrerPartie() {

			activerBoutonsJeu('jeu');

			distribuerCartes();
			setTimeout(() => {
				determinerGagnant();
			},4000)

			// Initialiser le jeu
			const jeuDeCartes = creerCartes();
        	cartes.value = melangerCartes(jeuDeCartes);
		}


		// Appel initial lors du chargement de la page
		window.onload = function() {
            activerBoutonsJeu('initial');
        }
	})
</script>