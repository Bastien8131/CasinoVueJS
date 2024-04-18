<script setup>

</script>

<template>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">


	<div class="centre">
		<div class="container">
			<h2 class="text-center text-light mb-5">Inscription</h2>
			<form>
                <div class="mb-3">
					<label for="email" class="form-label text-light">Pseudo</label>
					<input type="email" class="form-control" id="email" placeholder="Entrez votre pseudo" required>
				</div>
				<div class="mb-5">
					<label for="email" class="form-label text-light">E-mail</label>
					<input type="email" class="form-control" id="email" placeholder="Entrez votre email" required>
				</div>

				<div class="d-grid gap-2">
					<button type="submit" class="btn btn-success">S'INSCRIRE</button>
				</div>
				<div class="d-grid gap-2 mt-3">
					<button type="button" class="btn btn-primary">SE CONNECTER</button>
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