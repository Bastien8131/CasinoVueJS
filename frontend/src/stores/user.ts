import { defineStore } from 'pinia'
import axios from "axios";

const API_URL = 'http://localhost:5170'

export const useUserStore = defineStore('user',{
  state: () => ({
    id: 0,
    socketId: '',
    pseudo: '',
    email: '',
    credit: 0,
    score: 0
  }),
  actions: {
    setUserData(id: number, socketId: string, pseudo: string, email: string, credit: number, score: number) {
      this.id = id
      this.socketId = socketId
      this.pseudo = pseudo
      this.email = email
      this.credit = credit
      this.score = score
    },
    setId(id: number) {
      this.id = id
    },
    setSocketId(socketId: string) {
      this.socketId = socketId
    },
    setPseudo(pseudo: string) {
      this.pseudo = pseudo
    },
    setEmail(email: string) {
      this.email = email
    },
    setCredit(credit: number) {
      this.credit = credit
      const socket = this.$socket;

      socket.emit('update', {
        id: this.id,
        socketId: this.socketId,
        credit: this.credit,
        score: this.score
      })


      // socket.emit('update', {
      //   id: this.id,
      //   credit: this.credit
      // }, response => {
      //   if(response.message == 'success') {
      //     console.log('credit updated')
      //   } else {
      //     console.error(response.message)
      //   }
      // })
    },
    setScore(score: number) {
      this.score = score
    },
    login(pseudo: string, email: string) {
      if(pseudo === '' || email === '') return console.error('empty field')
      const socket = this.$socket;

      return new Promise((resolve, reject) => {
        socket.emit('login', {pseudo, email}, response => {
          if (response.message == 'success') {
            this.setUserData(
              response.value._id,
              response.value._socketId,
              response.value._pseudo,
              response.value._email,
              response.value._credit,
              response.value._score
            );
            // console.log('ici', response.value._credit);
            resolve(response);  // Résoudre la Promise avec la réponse
          } else {
            reject(new Error(response.message));  // Rejeter la Promise avec une erreur
          }
        });
      });

      // socket.emit('login', {pseudo: pseudo, email: email}, response => {
      //   if(response.message == 'success') {
      //     this.setUserData(response.id, response.pseudo, response.email, response.credit, response.score)
      //   } else {
      //     console.error(response.message)
      //   }
      // })
    },
    onBan() {
      const socket = this.$socket;
      socket.on('ban', () => {
        this.setUserData(0, '', '', '', 0, 0)
      });
    }
  },
  getters: {
    getUserData() {
      return {
        id: this.id,
        socketId: this.socketId,
        pseudo: this.pseudo,
        email: this.email,
        credit: this.credit,
        score: this.score
      }
    },
    getId() {
      return this.id
    },
    getSocketId() {
      return this.socketId
    },
    getPseudo() {
      return this.pseudo
    },
    getEmail() {
      return this.email
    },
    getCredit() {
      return this.credit
    },
    getScore() {
      return this.score
    }
  },
})