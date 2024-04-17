<script setup>

</script>

<template>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">


	<div class="centre">
		<div class="container">
			<h2 class="text-center text-light mb-4">Connexion</h2>
			<form>
			<div class="mb-3">
				<label for="email" class="form-label text-light">E-mail</label>
				<input type="email" class="form-control" id="email" placeholder="Entrez votre email" required>
			</div>
			<div class="mb-5">
				<label for="password" class="form-label text-light">Mot de passe</label>
				<input type="password" class="form-control" id="password" placeholder="Entrez votre mot de passe" required>
			</div>
			<div class="d-grid gap-2">
				<button type="submit" class="btn btn-primary">SE CONNECTER</button>
				<button type="button" class="btn btn-secondary">CRÉER UN COMPTE</button>
			</div>
			<div class="text-center mt-3">
				<a href="#" class="text-light">Mot de passe oublié ?</a>
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