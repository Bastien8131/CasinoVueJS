import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// Animation menu burger
const toggler = document.querySelector('.menu__toggler');
const menu    = document.querySelector('.menu');

/*
 * Toggles on and off the 'active' class on the menu
 * and the toggler button.
 */
toggler.addEventListener('click', () => {
  toggler.classList.toggle('active');
  menu.classList.toggle('active');
})