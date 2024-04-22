import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import io from 'socket.io-client';

const app = createApp(App)
const pinia = createPinia()
const socket = io('http://localhost:5170');

pinia.use(({ store }) => {
  store.$socket = app.config.globalProperties.$socket;
});

// Assurez-vous que cette ligne est avant app.mount('#app')
app.use(pinia)
app.config.globalProperties.$socket = socket
app.mount('#app')






// Animation menu burger
const toggler = document.querySelector('.menu__toggler');
const menu = document.querySelector('.menu');
const sidebarLinks = document.querySelectorAll('.btn-sidebar');

// Ajoutez un écouteur d'événements à chaque lien de la sidebar
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggler.classList.remove('active'); // Ferme le bouton du menu burger
    menu.classList.remove('active');    // Ferme la sidebar
  });
});

// Ajoutez également l'écouteur d'événements pour ouvrir et fermer la sidebar avec le bouton du menu burger comme avant
toggler.addEventListener('click', () => {
  toggler.classList.toggle('active');
  menu.classList.toggle('active');
});
