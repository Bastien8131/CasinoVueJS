<template>
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
			<div>
				<p>Crédits : <span id="credits">10000</span></p>
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
</style>

<script setup>
	import { onMounted, ref } from 'vue';

	let CarteLocaux = ref([]);
	let CarteVisiteurs = ref([]);
	let cartes = ref([]);
	let credits = ref(10000);
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
		function activerBoutonsJeu(activer) {
			const boutonLocaux = document.querySelector('.locaux');
			const boutonEgalite = document.querySelector('.egalite');
			const boutonVisiteurs = document.querySelector('.visiteurs');
			const boutonsJetons = document.querySelectorAll('.bouton-jeton');
			const boutonChoix = document.querySelector('.choix-img');

			boutonLocaux.disabled = activer;
			boutonEgalite.disabled = activer;
			boutonVisiteurs.disabled = activer;

			if (!activer) {
				boutonLocaux.style.display = 'none';
				boutonEgalite.style.display = 'none';
				boutonVisiteurs.style.display = 'none';
				boutonChoix.style.display = 'none';
				boutonsJetons.forEach(bouton => bouton.style.display = 'none');
			} else {        
				boutonLocaux.style.display = 'inline-block';
				boutonEgalite.style.display = 'inline-block';
				boutonVisiteurs.style.display = 'inline-block';
				boutonChoix.style.display = 'inline-block';
				boutonsJetons.forEach(bouton => bouton.style.display = 'inline');
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
			CarteLocaux = cartesDistribuees[0];
			CarteVisiteurs = cartesDistribuees[1];

			const carteLocauxImg = document.querySelector('.carte-locaux');
			const carteVisiteursImg = document.querySelector('.carte-visiteurs');

			// Animer la disparition des anciennes cartes
			carteLocauxImg.style.transform = 'translateX(-200%)';
			carteVisiteursImg.style.transform = 'translateX(200%)';
			carteLocauxImg.style.opacity = 0;
			carteVisiteursImg.style.opacity = 0;

			// Attendre la fin de l'animation de disparition
			setTimeout(() => {
				// Réinitialiser les anciennes cartes
				carteLocauxImg.src = '';
				carteLocauxImg.alt = '';
				carteVisiteursImg.src = '';
				carteVisiteursImg.alt = '';

				// Réinitialiser la position des cartes
				carteLocauxImg.style.transform = 'translateX(-200%)';
				carteVisiteursImg.style.transform = 'translateX(200%)';

				// Animer l'apparition des nouvelles cartes
				setTimeout(() => {
					carteLocauxImg.src = `src/assets/img/Cartes/${CarteLocaux.valeur}_de_${CarteLocaux.type}.jpg`;
					carteVisiteursImg.src = `src/assets/img/Cartes/${CarteVisiteurs.valeur}_de_${CarteVisiteurs.type}.jpg`;
					carteLocauxImg.style.opacity = 1;
					carteVisiteursImg.style.opacity = 1;

					carteLocauxImg.style.transform = 'translateX(0)';
					carteVisiteursImg.style.transform = 'translateX(0)';
				}, 500);
			}, 500);

			carteLocauxImg.addEventListener('transitionend', () => {
				carteLocauxImg.style.transform = 'rotateX(30deg)';
			});

			carteVisiteursImg.addEventListener('transitionend', () => {
				carteVisiteursImg.style.transform = 'rotateX(30deg)';
			});
		}
		

		// Fonction pour déterminer le gagnant
		function determinerGagnant() {
			const valeursCartes = {
				'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': 11
			};
		
			const valeurCarteLocaux = valeursCartes[CarteLocaux.valeur];
			const valeurCarteVisiteurs = valeursCartes[CarteVisiteurs.valeur];
		
			let gagnant;
			if (valeurCarteLocaux > valeurCarteVisiteurs) {
				gagnant = 'LOCAUX';
			} else if (valeurCarteLocaux < valeurCarteVisiteurs) {
				gagnant = 'VISITEURS';
			} else {
				gagnant = 'EGALITE';
			}
		
			if (choixJoueur === gagnant) {
				setTimeout(function() {
					afficherPopup(`Vous avez gagné ! Vos crédits ont été crédités.`);
				}, 3000);
				if (choixJoueur === 'EGALITE'){
					credits.value += mise.value*12;
				} else {
					credits.value += mise.value*2;
				}
			} else {
				setTimeout(function() {
					afficherPopup(`Vous avez perdu. Meilleure chance la prochaine fois !`);
				}, 3000);
				if (gagnant === 'EGALITE'){
					credits.value += mise.value/2;
				}
			}
		
			mise.value = 0;
		}
		

		// Fonction pour mettre à jour les informations du jeu
		function mettreAJourInformationsJeu() {
			document.getElementById('credits').textContent = credits.value;
			document.getElementById('mise').textContent = mise.value;
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
			popupResultat.style.backgroundColor = '#333';
			popupResultat.style.color = '#fff';
			popupResultat.style.padding = '20px';
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
			activerBoutonsJeu(false);

			distribuerCartes();
			determinerGagnant();
			mettreAJourInformationsJeu();

			setTimeout(function() {
				activerBoutonsJeu(true);
			}, 8000);
		}
	})
</script>