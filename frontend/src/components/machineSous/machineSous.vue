<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <div class="machineSous-container">
    <div class="col-md-7 infos text-center d-flex justify-content-center">
            <a class="btn-jouer">JOUER</a>
            <div class="mise-credit-container">
              <input type="number" placeholder="Votre mise">
                <p>Crédits : <span id="credits">10000</span></p>
                <p>Mise : <span id="mise">0</span></p>
            </div>
      </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
  .machineSous-container {
    background-image: url("@/assets/img/MachineSous/machine_sous.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .btn-jouer {
    position: absolute;
    top: 615px;
    left: 640px;
    padding: 10px 20px;
    background-color: #583B33;
    border: 2px solid white;
    border-radius: 5px;
    color: white;
    font-size: 1.5em;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
  }
  .btn-jouer:hover {
    background-color: aliceblue;
    color: black;
    border: 2px solid black;
    transition: 0.2s;
  }
  .mise-credit-container {
    position: absolute;
    top: 610px;
    left: 810px;
  }
  .mise-credit-container p {
    margin-bottom: 0;
  }
</style>