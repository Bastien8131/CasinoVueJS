<script setup>
import {useUserStore} from "@/stores/user";
import {ref} from "vue";

const userStore = useUserStore();
const emit = defineEmits(['inFocus', 'submit'])

let errorMessage = ref('');
let pseudo = ref('bastienb');
let email = ref('bastienb@casino.com');

const submit = async () => {
  try {
    const response = await userStore.login(pseudo.value, email.value);
    console.log('Login successful:', response);
    console.log('User credit:', userStore.getEmail);
    emit('changeContent', 'accueil');
    errorMessage.value = '';  // Clear any previous error messages
  } catch (error) {
    console.error('Login failed:', error.message);
    errorMessage.value = error.message || 'Une erreur est survenue lors de la connexion.';
  }
}


</script>

<template>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">


	<div class="centre">
		<div class="container">
			<h2 class="text-center text-light mb-4">Connexion</h2>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
			<form>
        <div class="mb-3">
          <label for="pseudo" class="form-label text-light">Pseudo</label>
          <input type="pseudo" class="form-control" id="pseudo" placeholder="Entrez votre pseudo" required v-model="pseudo">
        </div>
			<div class="mb-5">
				<label for="email" class="form-label text-light">E-mail</label>
				<input type="email" class="form-control" id="email" placeholder="Entrez votre email" required v-model="email">
			</div>
			<div class="d-grid gap-2">
				<button type="button" class="btn btn-primary" @click="submit()">SE CONNECTER</button>
				<button type="button" class="btn btn-secondary" @click="$emit('changeContent', 'inscription')">CRÉER UN COMPTE</button>
			</div>
			</form>
		</div>
	</div>

</template>

<style scoped>
.centre {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container {
  background-color: #0c0f2e;
padding: 3%;
  border-radius: 10%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 25%;
}
</style>