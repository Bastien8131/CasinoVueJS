<script setup>
	import { onMounted, ref } from 'vue';
	import { useUserStore } from "@/stores/user";

	let userStore = useUserStore();
	let credits = ref(userStore.getCredit);
	let mise = ref(0);
	let numeroMiser = ref(-1);
	let numeroGagnant;

	
	onMounted(() => {

		// Fonction pour mettre à jour les scores
		function mettreAJourInformationsJeu() {
			document.getElementById('mise').textContent = mise.value + ' €';

			userStore.setCredit(credits.value);
		}


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
					afficherPopupResultat("Vous n'avez pas assez de crédits pour placer une mise.");
				}

			});

		});


		// Pour le lien des numeros
		const numeros = document.querySelectorAll('.numero');

		numeros.forEach(function(numero) {
			numero.addEventListener('click', function(event) {
				event.preventDefault();

				if (mise.value > 0) {
					const valeurNumero = parseInt(numero.getAttribute('value'));
					numeroMiser.value = valeurNumero;
				} else {
					afficherPopupResultat("Veuillez d'abord sélectionner un jeton de mise.");
				}
			});
		});


        // Fonction pour activer/désactiver les jetons de mise
        function activerBoutonsJeu(mode) {
            const boutonsJetons = document.querySelectorAll('.bouton-jeton');
			const boutonNumero = document.querySelectorAll('.numero');
			const boutonLancer = document.getElementById('lancer-roulette');
			const ballons = document.querySelector('.ballons-img');
            const pauvre = document.querySelector('.pauvre-img');

			switch (mode) {
                case 'initial':
                    // Affichage initial des éléments
					boutonNumero.forEach(bouton => bouton.style.display = 'inline');
					boutonsJetons.forEach(bouton => bouton.style.display = 'inline');
					boutonLancer.style.display = 'inline';
                    ballons.style.display = 'none';
                    pauvre.style.display = 'none';
                    break;
				case 'jeu':
                    // Affichage pendant le jeu
					boutonNumero.forEach(bouton => bouton.style.display = 'none');
					boutonsJetons.forEach(bouton => bouton.style.display = 'none');
					boutonLancer.style.display = 'none';
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



		// Pour le bouton "Lancer la roulette"
		document.getElementById('lancer-roulette').addEventListener('click', function() {
      	if (mise.value > 0 && numeroMiser.value != -1) {
        	activerBoutonsJeu('jeu');
			demarrerPartie();
      	} else {
        	afficherPopupResultat('Veuillez d\'abord selectionner une mise.');
      	}
			
		});


		function resultat(){

			let resultat = false;
			console.log("vous avez misé sur le numero "+numeroMiser.value);
			console.log("Le numero gagnant est " + numeroGagnant + " !");


			//les 3 colonnes 2to1 ou les 3 colonnes 1st12, 2nd12, 3rd12
			if ((numeroMiser.value === 85 && [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 14].includes(numeroGagnant)) ||
				(numeroMiser.value === 86 && [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].includes(numeroGagnant)) ||
				(numeroMiser.value === 87 && [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].includes(numeroGagnant)) ||
				(numeroMiser.value === 112 && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(numeroGagnant)) ||
				(numeroMiser.value === 1324 && [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].includes(numeroGagnant)) ||
				(numeroMiser.value === 2536 && [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].includes(numeroGagnant))){
					credits.value += (mise.value*3);
					resultat = true;
			}

			//EVEN (paire) ou ODD (impair) ou 1to18 ou 19to36 ou ROUGE ou NOIR
			if ((numeroMiser.value === 48 && [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36].includes(numeroGagnant)) ||
				(numeroMiser.value === 49 && [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35].includes(numeroGagnant)) ||
				(numeroMiser.value === 118 && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].includes(numeroGagnant)) ||
				(numeroMiser.value === 1936 && [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].includes(numeroGagnant)) ||
				(numeroMiser.value === 99 && [27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3, 32, 19, 21, 25, 34].includes(numeroGagnant)) ||
				(numeroMiser.value === 98 && [6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26, 15, 4, 2, 17].includes(numeroGagnant))){
					credits.value += (mise.value*2);
					resultat = true;
			}

			if ((numeroMiser.value === numeroGagnant)){
				credits.value += (mise.value*36);
				resultat = true;

			}

			return resultat;
		}

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


		function terminerPartie(){
			let vainqueur;

			if (resultat()){
				vainqueur = 'Vous avez gagné ! Vos crédits ont été crédités.';
			}
			else {
				vainqueur = 'Vous avez perdu. Meilleure chance la prochaine fois !';
			}

			afficherPopupResultat(vainqueur);
            if (vainqueur === 'Vous avez gagné ! Vos crédits ont été crédités.'){
                setTimeout(function() {
                    setTimeout(function() {
                        activerBoutonsJeu('gagné');
                    }, 2000);

                    setTimeout(function() {
                        activerBoutonsJeu('initial');
                    }, 9000);
                })
            } else if (vainqueur === 'Vous avez perdu. Meilleure chance la prochaine fois !'){
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
			numeroMiser.value = -1;
			mettreAJourInformationsJeu();
		}


		function demarrerPartie() {
			const balle = document.querySelector('.balle');
			const roue = document.querySelector('.roue');
			const centreRoue = {
				x: roue.offsetLeft + roue.offsetWidth / 2,
				y: roue.offsetTop + roue.offsetHeight / 2
			};
			const rayonInitial = roue.offsetWidth / 2.6; // Rayon initial de l'animation
			const rayonFinal = roue.offsetWidth / 4.8; // Rayon final pour atteindre le cercle des numéros
			const vitesseInitiale = Math.random() * (0.35 - 0.18) + 0.05; // Vitesse initiale aléatoire
			const ralentissement = 0.0002; // Ralentissement de la balle (en tours/seconde^2)
			let angle = Math.PI / 2; // Angle initial à gauche de la roue
			let rayon = rayonInitial;
			let vitesse = vitesseInitiale;


			function animerBalle() {

				// Calculer la nouvelle position de la balle
				const x = centreRoue.x + rayon * Math.cos(angle);
				const y = centreRoue.y + rayon * Math.sin(angle);
				balle.style.left = `${x - balle.offsetWidth / 2}px`;
				balle.style.top = `${y - balle.offsetHeight / 2}px`;


				// Diminuer progressivement le rayon de la balle
				rayon = Math.max(rayonFinal, rayon - (rayonInitial - rayonFinal) / 500); // Augmentez le dénominateur pour ralentir davantage


				// Ralentir la balle
				vitesse -= ralentissement;
				angle += vitesse;


				// Arrêter l'animation si la vitesse est proche de zéro ou si la distance restante est faible
				if (vitesse > 0) {
					requestAnimationFrame(animerBalle);
				} else {
					const numeroGagnant = obtenirNumeroSortie(angle);
					terminerPartie(numeroGagnant);
				}
			}
			animerBalle();
		}


		function obtenirNumeroSortie(angle) {

			// Calculer le numéro en fonction de l'angle d'arrêt de la balle
			const numeros = [6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25, 17, 34];
			const indexNumero = Math.floor(angle / (2 * Math.PI) * numeros.length);

			numeroGagnant = numeros[(indexNumero % numeros.length)];
			return numeroGagnant;
		}


		// Appel initial lors du chargement de la page
		window.onload = function() {
            activerBoutonsJeu('initial');
        }
	})
</script>

<template>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">

	<img src="@/assets/img/ballons.svg" alt="" class="ballons-img">
    <img src="@/assets/img/pauvre.svg" alt="" class="pauvre-img">

	<div class="roulette-container d-flex justify-content-space">
        <img class="roue" src="@/assets/img/Roulette/Roue/roue.svg" alt="Roulette">
        <img class="tableau" src="@/assets/img/Roulette/tableau.svg" alt="tableau de mise">
    </div>
    <img class="balle" src="@/assets/img/Roulette/balle.svg" alt="Balle blanche">


    <a class="numero twoTo1First" value="85"></a>
    <a class="numero twoTo1Second" value="86"></a>
    <a class="numero twoTo1Third" value="87"></a>



    <a class="numero EVEN" value="48"></a>
    <a class="numero ODD" value="49"></a>

    <a class="numero oneTo18" value="118"></a>
    <a class="numero dixneufTo36" value="1936"></a>

    <a class="numero first12" value="112"></a>
    <a class="numero second12" value="1324"></a>
    <a class="numero third12" value="2536"></a>

    <a class="numero rouge" value="99"></a>
    <a class="numero noir" value="98"></a>
    <a class="numero num0" value="0"></a>
    <a class="numero selection num1" value="1"></a>
    <a class="numero selection num2" value="2"></a>
    <a class="numero selection num3" value="3"></a>
    <a class="numero selection num4" value="4"></a>
    <a class="numero selection num5" value="5"></a>
    <a class="numero selection num6" value="6"></a>
    <a class="numero selection num7" value="7"></a>
    <a class="numero selection num8" value="8"></a>
    <a class="numero selection num9" value="9"></a>
    <a class="numero selection num10" value="10"></a>
    <a class="numero selection num11" value="11"></a>
    <a class="numero selection num12" value="12"></a>
    <a class="numero selection num13" value="13"></a>
    <a class="numero selection num14" value="14"></a>
    <a class="numero selection num15" value="15"></a>
    <a class="numero selection num16" value="16"></a>
    <a class="numero selection num17" value="17"></a>
    <a class="numero selection num18" value="18"></a>
    <a class="numero selection num19" value="19"></a>
    <a class="numero selection num20" value="20"></a>
    <a class="numero selection num21" value="21"></a>
    <a class="numero selection num22" value="22"></a>
    <a class="numero selection num23" value="23"></a>
    <a class="numero selection num24" value="24"></a>
    <a class="numero selection num25" value="25"></a>
    <a class="numero selection num26" value="26"></a>
    <a class="numero selection num27" value="27"></a>
    <a class="numero selection num28" value="28"></a>
    <a class="numero selection num29" value="29"></a>
    <a class="numero selection num30" value="30"></a>
    <a class="numero selection num31" value="31"></a>
    <a class="numero selection num32" value="32"></a>
    <a class="numero selection num33" value="33"></a>
    <a class="numero selection num34" value="34"></a>
    <a class="numero selection num35" value="35"></a>
    <a class="numero selection num36" value="36"></a>





    <div class="col-md-4 jetons">
        <a class="bouton-jeton" value="1"><img src="@/assets/img/jetons/1€.png" alt="jeton de 1€"></a>
        <a class="bouton-jeton" value="5"><img src="@/assets/img/jetons/5€.png" alt="jeton de 5€"></a>
        <a class="bouton-jeton" value="10"><img src="@/assets/img/jetons/10€.png" alt="jeton de 10€"></a>
        <a class="bouton-jeton" value="25"><img src="@/assets/img/jetons/25€.png" alt="jeton de 25€"></a>
        <a class="bouton-jeton" value="50"><img src="@/assets/img/jetons/50€.png" alt="jeton de 50€"></a>
        <a class="bouton-jeton" value="100"><img src="@/assets/img/jetons/100€.png" alt="jeton de 100€"></a>
        <a class="bouton-jeton" value="500"><img src="@/assets/img/jetons/500€.png" alt="jeton de 500€"></a>
        <a class="bouton-jeton" value="1000"><img src="@/assets/img/jetons/1000€.png" alt="jeton de 1000€"></a>
    </div>

    <div class="col-md-8 infos text-center d-flex justify-content-center">
        <a id="lancer-roulette"><img src="@/assets/img/Roulette/lancer.png" alt="Lancer la partie" class="bouton"></a>
		<div class="mise-container">
			<img src="@/assets/img/icon_jeton.svg" alt="jeton" class="icon_jeton"><div class="texte_mise">Mise Totale<div id="mise">{{ mise }} €</div></div>
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
	.roue {
		width: 40%;
		height: auto;
    margin-top: 4%;
		margin-left: 5%;
	}
	.tableau {
		width: 18%;
		height: auto;
		margin-top: 2%;
		margin-left: 15%;
	}
	.balle {
		position: absolute;
		width: 50px;
		height: 50px;
		top: 48%;
		left: 10%;
	}
	.jetons {
		position: absolute;
		bottom: 2%;
		left: 2%;
	}
	.bouton-jeton img {
		width: 10%;
		height: auto;
		cursor: pointer;
	}
	.selection{
		position: absolute;
		width: 4.4%;
		height: 5.7%;
		cursor: pointer;
	}
	.rouge{
		position: absolute;
		width: 2.1%;
		height: 11.6%;
		cursor: pointer;
		top: 37.7%;
		left: 60.1%;
	}
	.noir{
		position: absolute;
		width: 2.1%;
		height: 11.6%;
		cursor: pointer;
		top: 49.4%;
		left: 60.1%;
	}
	.num0{
		position: absolute;
		width: 13.6%;
		height: 6.2%;
		cursor: pointer;
		top: 7.8%;
		left: 64.3%;
	}
	.num1{
		top: 14.3%;
		left: 64.4%;
	}
	.num2{
		top: 14.3%;
		left: 68.9%;
	}
	.num3{
		top: 14.3%;
		left: 73.4%;
	}
	.num4{
		top: 20.2%;
		left: 64.4%;
	}
	.num5{
		top: 20.2%;
		left: 68.9%;
	}
	.num6{
		top: 20.2%;
		left: 73.4%;
	}
	.num7{
		top: 26.1%;
		left: 64.4%;
	}
	.num8{
		top: 26.1%;
		left: 68.9%;
	}
	.num9{
		top: 26.1%;
		left: 73.4%;
	}
	.num10{
		top: 31.8%;
		left: 64.4%;
	}
	.num11{
		top: 31.8%;
		left: 68.9%;
	}
	.num12{
		top: 31.8%;
		left: 73.4%;
	}
	.num13{
		top: 37.7%;
		left: 64.4%;
	}
	.num14{
		top: 37.7%;
		left: 68.9%;
	}
	.num15{
		top: 37.7%;
		left: 73.4%;
	}
	.num16{
		top: 43.6%;
		left: 64.4%;
	}
	.num17{
		top: 43.6%;
		left: 68.9%;
	}
	.num18{
		top: 43.6%;
		left: 73.4%;
	}
	.num19{
		top: 49.5%;
		left: 64.4%;
	}
	.num20{
		top: 49.5%;
		left: 68.9%;
	}
	.num21{
		top: 49.5%;
		left: 73.4%;
	}
	.num22{
		top: 55.3%;
		left: 64.4%;
	}
	.num23{
		top: 55.3%;
		left: 68.9%;
	}
	.num24{
		top: 55.3%;
		left: 73.4%;
	}
	.num25{
		top: 61.2%;
		left: 64.4%;
	}
	.num26{
		top: 61.2%;
		left: 68.9%;
	}
	.num27{
		top: 61.2%;
		left: 73.4%;
	}
	.num28{
		top: 67%;
		left: 64.4%;
	}
	.num29{
		top: 67%;
		left: 68.9%;
	}
	.num30{
		top: 67%;
		left: 73.4%;
	}
	.num31{
		top: 72.9%;
		left: 64.4%;
	}
	.num32{
		top: 72.9%;
		left: 68.9%;
	}
	.num33{
		top: 72.9%;
		left: 73.4%;
	}
	.num34{
		top: 78.7%;
		left: 64.4%;
	}
	.num35{
		top: 78.7%;
		left: 68.9%;
	}
	.num36{
		top: 78.7%;
		left: 73.4%;
	}
	.first12{
		position: absolute;
		cursor: pointer;
		width: 2.1%;
		height: 23.3%;
		top: 14.2%;
		left: 62.2%;
	}
	.second12{
		position: absolute;
		cursor: pointer;
		width: 2.1%;
		height: 23.3%;
		top: 37.7%;
		left: 62.2%;
	}
	.third12{
		position: absolute;
		cursor: pointer;
		width: 2.1%;
		height: 23.3%;
		top: 61.1%;
		left: 62.2%;
	}
	.oneTo18{
		position: absolute;
		width: 2.1%;
		height: 11.5%;
		cursor: pointer;
		top: 14.3%;
		left: 60.1%;
	}
	.dixneufTo36{
		position: absolute;
		width: 2.1%;
		height: 11.5%;
		cursor: pointer;
		top: 72.9%;
		left: 60.1%;
	}
	.EVEN{
		position: absolute;
		width: 2.1%;
		height: 11.5%;
		cursor: pointer;
		top: 26%;
		left: 60.1%;
	}
	.ODD{
		position: absolute;
		width: 2.1%;
		height: 11.5%;
		cursor: pointer;
		top: 61.2%;
		left: 60.1%;
	}
	.twoTo1First{
		position: absolute;
		width: 4.4%;
		height: 4.3%;
		cursor: pointer;
		top: 84.6%;
		left: 64.4%;
	}
	.twoTo1Second{
		position: absolute;
		width: 4.4%;
		height: 4.3%;
		cursor: pointer;
		top: 84.6%;
		left: 68.9%;
	}
	.twoTo1Third{
		position: absolute;
		width: 4.4%;
		height: 4.3%;
		cursor: pointer;
		top: 84.6%;
		left: 73.4%;
	}
	.bouton {
		width: 10%;
		height: auto;
		margin-left: 85%;
    	cursor: pointer;
	}
	.infos {
		font-weight: bold;
		color: rgb(255, 255, 255);
		font-size: 1.15rem;
		margin-top: -1%;
	}
	.mise-container {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid grey;
		border-radius: 15px 15px 15px 15px / 50% 50% 50% 50%;
		background-color: transparent;
		width: 15%;
        height: 10%;
		margin-top: 2%;
	}
	#mise{
		color: yellow;
	}
	.icon_jeton{
		position: relative;
		width: 30%;
		left: -10%;
	}
	.texte_mise{
		margin-left: -10%;
	}
</style>