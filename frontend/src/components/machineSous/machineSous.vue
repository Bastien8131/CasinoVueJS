<template>
	<img src="@/assets/img/ballons.svg" alt="" class="ballons-img">
	<img src="@/assets/img/pauvre.svg" alt="" class="pauvre-img">
  
	<div class="machineasous-container">
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
			<a class="jouer">JOUER</a>
			<div class="mise-container">
			<p>Mise : <span id="mise">{{ mise }}</span></p>
			</div>
		</div>
		<div class="roueslot">
			<img class="roueslot-img" v-for="(img, index) in roueslotImages" :key="index" :src="img" alt="">
		</div>
	</div>
</template>
  
<script setup>
	import { onMounted, ref } from 'vue';
	import { useUserStore } from "@/stores/user";
	
	let userStore = useUserStore();
	let credits = ref(userStore.getCredit);
	let mise = ref(0);
	let roueslotImages = ref([]);
	let timerAnimation;
	let symboles = ['7.svg', 'banane.svg', 'cerise.svg', 'citron.svg', 'cloche.svg', 'couronne.svg', 'fraise.svg', 'pomme.svg'];
	
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


		// evenements pour les choix du joueur
		const btnLancer = document.querySelector('.jouer');

		btnLancer.addEventListener('click', function () {
			if (mise.value > 0) {
				demarrerPartie();
			} else {
				afficherPopup('Veuillez d\'abord choisir une mise.');
				return;
			}
		});

	
		// Fonction pour mettre à jour les informations du jeu
		function mettreAJourInformationsJeu() {
		document.getElementById('mise').textContent = mise.value;
		userStore.setCredit(credits.value);
		}
	
		// Fonction pour activer/désactiver les boutons de jeu
		function activerBoutonsJeu(mode) {
		const boutonsJetons = document.querySelectorAll('.bouton-jeton');
		const ballons = document.querySelector('.ballons-img');
		const pauvre = document.querySelector('.pauvre-img');
	
		switch (mode) {
			case 'initial':
			// Affichage initial des éléments
			boutonsJetons.forEach(bouton => bouton.style.display = 'inline');
			ballons.style.display = 'none';
			pauvre.style.display = 'none';
			break;
			case 'jeu':
			// Affichage pendant le jeu
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
		if (resultat == 'Vous avez gagné ! Vos crédits ont été crédités.') {
			popupResultat.style.backgroundColor = '#1d8010';
		}
		else if (resultat == 'Vous avez perdu. Meilleure chance la prochaine fois !') {
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
	
		function demarrerPartie() {
			if (mise.value > 0) {
				activerBoutonsJeu('jeu');
				animerRoueslot();
			} else {
				afficherPopup('Veuillez d\'abord choisir une mise.');
				return;
			}
		}
	
		function animerRoueslot() {
			roueslotImages.value = [];
			for (let i = 0; i < 3; i++) {
			const symbolePath = `/src/assets/img/MachineSous/logo_MachineSous/${symboles[Math.floor(Math.random() * symboles.length)]}`;
			const symboleUrl = new URL(`${symbolePath}`, import.meta.url).href;
			roueslotImages.value.push(symboleUrl);
			}

			let delaiAnimation = 200;
			timerAnimation = setInterval(() => {
			for (let i = 0; i < 3; i++) {
				const symbolePath = `/src/assets/img/MachineSous/logo_MachineSous/${symboles[Math.floor(Math.random() * symboles.length)]}`;
				const symboleUrl = new URL(`${symbolePath}`, import.meta.url).href;
				roueslotImages.value[i] = symboleUrl;
			}
			}, delaiAnimation);

			setTimeout(() => {
			clearInterval(timerAnimation);
			verifierResultat();
			}, 3000);
		}
	
		function verifierResultat() {
			let resultat;
			const symbolesRoueslot = roueslotImages.value.map(img => img.split('/').pop().split('.')[0]);
			const gagne = symbolesRoueslot.every(sym => sym === symbolesRoueslot[0]);

            if (gagne){
				afficherPopup('Vous avez gagné ! Vos crédits ont été crédités.');
				credits.value += mise.value * 5;
                setTimeout(function() {
                    setTimeout(function() {
                        activerBoutonsJeu('gagné');
                    }, 2000);

                    setTimeout(function() {
                        activerBoutonsJeu('initial');
                    }, 9000);
                })
            } else {
				afficherPopup('Vous avez perdu. Meilleure chance la prochaine fois !');
                setTimeout(function() {
                    setTimeout(function() {
                        activerBoutonsJeu('perdu');
                    }, 2000);

                    setTimeout(function() {
                        activerBoutonsJeu('initial');
                    }, 9000);
                })
            }

			mise.value = 0;
			mettreAJourInformationsJeu();
		}

		// Appel initial lors du chargement de la page
		window.onload = function() {
			activerBoutonsJeu('initial');
		}
	})
</script>

<style scoped>
    @keyframes monter {
        0% { transform: translateY(100vh); }
        100% { transform: translateY(-200vh); }
    }
	.ballons-img, .pauvre-img {
		position: absolute;
		display: none;
		z-index: 9999;
		transform: translateX(0);
		animation: monter 10s linear forwards;
	}
	.machineasous-container {
		background-image: url("@/assets/img/MachineSous/machine_sous.png");
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
	.mise-container {
		display: flex;
		align-items: center;
	}
	.jouer {
		cursor: pointer;
	}
	.roueslot {
		position: absolute;
		top: 50%;
		left: 52%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60%;

	}
	.roueslot-img {
		width: 10%;
		margin: 3%;
	}
</style>