<template>
  <div id="app">

      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" @click="rootProductTreatmentPhase">Ocoplast</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#" @click="rootNewProduct">Nuevo Producto <span class="sr-only">(current)</span></a>
            </li>
             <li class="nav-item active">
              <a class="nav-link" href="#" @click="rootAddQuantities">Agregar a Inventario <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#" @click="rootProductTreatmentPhase">Procesar <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#" @click="rootClassification">Clasificar <span class="sr-only">(current)</span></a>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link" href="#" @click="rootInventary">otro </a>
            </li> -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Reportes
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#" @click="rootInventary">Reporte Producto en Fases</a>
                <a class="dropdown-item" href="#" @click="rootProductQuantities">Reporte Producto en Bruto</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click="rootPullQuantities">Reporte Pool de Producto</a>
              </div>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#" @click="rootParametrizeCost">Parametrizar Costos <span class="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>

    <router-view/>
  </div>
</template>


<script>
export default {
  name: 'App',
  methods:{
    rootProductTreatmentPhase: function() {
      this.$router.push({ name: 'PeticionAjax'})
    },
    rootInventary: function() {
      this.$router.push({ name: 'Inventary'})
    },
    rootProductQuantities: function() {
      this.$router.push({ name: 'ProductQuantities'})
    },
    rootPullQuantities: function() {
      this.$router.push({ name: 'PullQuantities'})
    },
    rootClassification: function() {
      this.$router.push({ name: 'Classification'})
    },
    rootNewProduct: function() {
      this.$router.push({ name: 'NewProduct'})
    },
    rootAddQuantities: function() {
      this.$router.push({ name: 'AddQuantities'})
    },
    rootParametrizeCost: function(){
      this.$router.push({ name: 'ParametrizeCost'})
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin-bottom: 60px;
}
</style>
