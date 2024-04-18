<script setup>
import { ref } from 'vue'
import MachineSous from "@/components/machineSous/machineSous.vue";
import Connexion from "@/components/connexion/connexion.vue";
import Roulette from "@/components/roulette/roulette.vue";
import Blackjack from "@/components/blackjack/blackjack.vue";
import Accueil from "@/components/accueil/accueil.vue";

const content = ref('accueil')

const changeContent = (newContent) => {
  content.value = newContent
}


</script>

<template>
  <div class="bg-overflow"></div>
    <div class="menu">
      <a @click="changeContent('accueil')" class="btn-sidebar" id="accueil">Accueil</a>
      <a @click="changeContent('connexion')" class="btn-sidebar" id="connexion">Connexion</a>
      <a @click="changeContent('roulette')" class="btn-sidebar" id="roulette">Roulette</a>
      <a @click="changeContent('blackjack')" class="btn-sidebar" id="blackjack">BlackJack</a>
      <a @click="changeContent('machineSous')" class="btn-sidebar" id="machineSous">Machine à sous</a>
  </div>
  <div class="menu__toggler"><span></span></div>
  <component class="main-content" :is="content">
    <accueil v-if="content === 'accueil'"></accueil>
    <machineSous v-if="content === 'machineSous'"></machineSous>
    <connexion v-if="content === 'connexion'"></connexion>
    <roulette v-if="content === 'roulette'"></roulette>
    <blackjack v-if="content === 'blackjack'"></blackjack>
  </component>
  <div class="hud-value">
    <div class="content">
      <div class="acheter-crd">
        <button onclick="addCredits()">Acheter Credits</button>
      </div>
      <div class="credits">
        <div class="logo"></div>
        <p id="credits-value">0</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.bg-overflow{
  background-image: url("assets/img/webp/bg_sans_ihm.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  filter: blur(5px);
}

.main-content{
  position: relative;
  z-index: 1;
}

.hud-value{
  background-image: url("assets/img/png/hud-value.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 0;
  height: 64px;
  width: 100%;
  margin-top: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8%;
  box-sizing: border-box;
  z-index: 2;

  .content{
    height: 100%;
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: -2px;

    .btn-burger{
      width: 8%;
      height: 100%;
      background-image: url("https://www.svgrepo.com/show/506800/burger-menu.svg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
    }

    .acheter-crd {
      width: 42%;
      height: 100%;
      display: flex;
      justify-content: center;

      button{
        width: 90%;
        height: 100%;
        background-color: #205f66;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: 300ms;
        outline: none;

        &:hover{
          background-color: #1a4c52;
        }
      }
    }

    .credits{
      width: 50%;
      height: 100%;
      gap: 5%;
      display: flex;
      align-items: center;

      .logo{
        background-color: #205f66;
        background-image: url("https://www.svgrepo.com/show/222662/coins-money.svg");
        background-size: 60%;
        background-repeat: no-repeat;
        background-position: center;
        width: 20%;
        height: 100%;
        border-radius: 5px;
      }

      #credits-value{
        width: 75%;
        height: 100%;
        background-color: white;
        border: #423124 2px solid;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding: 1% 3%;
        box-sizing: border-box;
        user-select: none;

      }
    }

  }
}

ul {
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  font-size: xx-large;
  background: rgba(255, 255, 255, 0.7);
  li{
    cursor: pointer;
  }
}

accueil{
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}
</style>
