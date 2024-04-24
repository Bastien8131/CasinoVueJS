<script setup>
import axios from "axios";
import {ref} from "vue";

let errorMessage = ref('');
let message = ref('');
let pseudo = ref('');
let email = ref('');

const submit = async () => {
  await axios.post('http://localhost:5170/register', {
    pseudo: pseudo.value,
    email: email.value
  }).then(response => {
    console.log('Register successful:', response);
    message.value = 'Inscription réussie. Vous pouvez maintenant vous connecter.';
  }).catch(error => {
    console.error('Register failed:', error.message);
    errorMessage.value = error.message || 'Une erreur est survenue lors de l\'inscription.';
  });
}
</script>

<template>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">


	<div class="centre">
		<div class="container">
			<h2 class="text-center text-light mb-5">Inscription</h2>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <div v-if="message" class="alert alert-info" role="alert">
        {{ message }}
      </div>
      <form>
        <div class="mb-3">
					<label for="pseudo" class="form-label text-light">Pseudo</label>
					<input type="text" class="form-control" id="pseudo" placeholder="Entrez votre pseudo" required v-model="pseudo">
				</div>
				<div class="mb-5">
					<label for="email" class="form-label text-light">E-mail</label>
					<input type="email" class="form-control" id="email" placeholder="Entrez votre email" required v-model="email">
				</div>

				<div class="d-grid gap-2">
					<button type="button" class="btn btn-success" @click="submit">S'INSCRIRE</button>
				</div>
				<div class="d-grid gap-2 mt-3">
          <button type="button" class="btn btn-secondary" @click="$emit('changeContent', 'connexion')">RETOUR</button>
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