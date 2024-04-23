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







