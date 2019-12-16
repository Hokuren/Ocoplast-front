<template>
<div class="container">
  <div class="row">
    <div class="col-3">
        <form>
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Fase</label>
            <div class="col-sm-8">
                <input type="password" class="form-control" id="inputPassword3">
            </div>
        </div>     
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Fecha</label>
            <div class="col-sm-8">
                <input type="password" class="form-control" id="inputPassword3">
            </div>
        </div>     
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Producto</label>
            <div class="col-sm-8">
                <input type="password" class="form-control" id="inputPassword3">
            </div>
        </div>       
            <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Cantidad</label>
            <div class="col-sm-8">
                <input type="password" class="form-control" id="inputPassword3">
            </div>
        </div>       
        <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Costo </label>
            <div class="col-sm-8">
                <input type="password" class="form-control" id="inputPassword3">
            </div>
        </div>

        <div class="form-group row">
            <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">Añadir Cantidad</button>
            </div>
        </div>
        </form> 
    </div>
    <div class="col-9">

        <div>
        <h3>Prueba peticion ajax</h3> 
        <!-- <div v-for="product in products" :key="product.id">
            <p>{{ product.name }}</p>
            <hr>
        </div> -->
        </div>


        <form>
            <div class="form-group text-left">
                <label for="formGroupExampleInput" >Fase anterior</label>
                <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>

            <div class="form-group text-left">
                <label for="formGroupExampleInput" >Fase anterior</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
            </div>
            <div class="form-group text-left">
                <label for="formGroupExampleInput2">Phase Actual</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
            </div>
            <div class="form-group text-left">
                <label for="formGroupExampleInput2">Product</label>
                <input type="text" class="form-control" id="formGroupExampleInput3" placeholder="Another input placeholder">
            </div>
            <div class="form-group text-left">
                <label for="formGroupExampleInput2">Precio por Kilo</label>
                <input type="text" class="form-control" id="formGroupExampleInput4" placeholder="Another input placeholder">
            </div>
            <div class="form-group text-left">
                <label for="formGroupExampleInput2">Peso en Kg</label>
                <input type="text" class="form-control" id="formGroupExampleInput5" placeholder="Another input placeholder">
            </div>
            <div class="form-group text-left">
                <label for="formGroupExampleInput2">Tratamientos</label>
                <input type="text" class="form-control" id="formGroupExampleInput5" placeholder="Another input placeholder">
            </div>

            <div class="form-group row">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Cambiar Fase</button>
                </div>
            </div>
        </form>    
    </div>
  </div>
</div>

</template>


<script>

export default {
  name: 'Phases',
  data () {
    products: []

  },
  mounted () {
    this.getProducts()
  },
  methods: {
    getProducts: function() {
      this.$http.get('http://localhost:3000/products').then(response => {
        this.products = response.body;
      },response => {
        //error
      })
    }
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>