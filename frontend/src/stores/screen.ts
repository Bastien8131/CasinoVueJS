import { defineStore } from 'pinia'

export const useScreenStore = defineStore('screen',{
  state: () => ({
    screen: 'connexion'
  }),
  actions: {
    setScreen(screen: string) {
      this.screen = screen
    }
  },
  getters: {
    getScreen() {
      return this.screen
    }
  }
})