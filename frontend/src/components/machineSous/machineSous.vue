<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <div class="machineSous-container">
    <div class="col-md-7 infos text-center d-flex justify-content-center">
      <a @click="startSlotMachine" class="btn-jouer">JOUER</a>
      <div class="mise-credit-container">
        <input type="number" placeholder="Votre mise">
        <p>Crédits : <span id="credits">10000</span></p>
        <p>Mise : <span id="mise">0</span></p>
      </div>
    </div>
    <div class="slots">
      <div v-for="(image, index) in slotImages" :key="index" class="slot">
        <img :src="image" alt="Slot Image">
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const slotImages = ref([]);

    const startSlotMachine = () => {
      // Charger les images dans un ordre aléatoire
      const images = [
        require('@/assets/img/MachineSous/logo_MachineSous/7.svg').default,
        require('@/assets/img/MachineSous/logo_MachineSous/banane.svg').default,
        require('@/assets/img/MachineSous/logo_MachineSous/cerise.svg').default,
        require('@/assets/img/MachineSous/logo_MachineSous/citron.svg').default,
        require('@/assets/img/MachineSous/logo_MachineSous/cloche.svg').default,
        require('@/assets/img/MachineSous/logo_MachineSous/couronne.svg').default,
        require('@/assets/img/MachineSous/logo_MachineSous/fraise.svg').default,
        require('@/assets/img/MachineSous/logo_MachineSous/pomme.svg').default
      ];

      // Mélanger les images
      slotImages.value = shuffleArray(images);

      // Attendre quelques secondes avant de s'arrêter sur une combinaison aléatoire
      setTimeout(stopSlotMachine, 3000);
    };

    const stopSlotMachine = () => {
      const numberOfImages = slotImages.value.length;

      // Sélectionner aléatoirement une image pour chaque case
      const stoppedImages = Array.from({ length: numberOfImages }, () => {
        const randomIndex = Math.floor(Math.random() * numberOfImages);
        return slotImages.value[randomIndex];
      });

      // Mettre à jour les images pour afficher la combinaison arrêtée
      slotImages.value = stoppedImages;

      // Vous pouvez ajouter ici la logique pour vérifier les combinaisons gagnantes et les récompenses
    };

    const shuffleArray = (array) => {
      const newArray = array.slice();
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    return {
      slotImages,
      startSlotMachine
    };
  }
};
</script>

<style scoped>
.machineSous-container {
  background-image: url("@/assets/img/MachineSous/machine_sous.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.btn-jouer {
  position: absolute;
  top: 615px;
  left: 640px;
  padding: 10px 20px;
  background-color: #583B33;
  border: 2px solid white;
  border-radius: 5px;
  color: white;
  font-size: 1.5em;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.btn-jouer:hover {
  background-color: aliceblue;
  color: black;
  border: 2px solid black;
  transition: 0.2s;
}

.mise-credit-container {
  position: absolute;
  top: 610px;
  left: 810px;
}

.mise-credit-container p {
  margin-bottom: 0;
}

.slot {
  margin: 0 10px;
  width: 100px; /* Ajustez la taille des images selon vos besoins */
  height: 100px; /* Ajustez la taille des images selon vos besoins */
}
</style>