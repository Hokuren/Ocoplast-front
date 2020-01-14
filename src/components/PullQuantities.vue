<template>
  <div id="PullQuantities">


    <h3>Reporte Pool de Producto</h3>
  
      <div class="container">
        <div class="row">
          <table class="table">
            <thead class="thead-dark">
              <tr scope="row">
                <th scope="col" class="text-left">Pool</th>
              </tr>
            </thead>
            <tbody>
              <tr scope="row" v-for="(pull_quantitie, index) in pull_quantities" :key="index">
                <th class="text-left">
                  {{ pull_quantitie.product_name }}
                  <hr>
                  Peso: {{ pull_quantitie.weight }} Kg <br>
                  Costo: {{ pull_quantitie.cost}} Kg <br>
                  <p><b>Productos:</b></p>
                  <ul>
                      <li>
                          <p v-for="(product, index) in pull_quantitie.products" :key="index">
                            {{ product.product_name }} <br>
                            Peso:  {{ product.weight }} Kg <br>
                            Costo:  {{ product.cost}} Kg <br>
                            
                          </p>
                      </li>
                  </ul>
                </th>
              </tr>
            </tbody>
          </table>
          
          <!--<h3>Parametros</h3>
          <br>
          <p>
            {{ pull_quantities }}
          </p> -->

        </div>   <!-- closed row -->
    </div> <!-- closed contairner -->
<!-- 
    <div>
      <h3>Parametros</h3>
      <p> product_id: {{ phase_id }}</p> 
      <p>pull_quantities: {{ pull_quantities }}</p>
    </div>
     -->
  </div> 
</template> 


<script>

export default {
  name: 'PullQuantities',
  data () {
    return {
      phases: [],
      phase_id: '',
      pull_quantities: [],
      products: [],
      alert_pull_quantities: false
    }
  },
  mounted () {
    this.getPullQuantities();
  },
  beforeUpdate () {

  },
  methods: {
    getPullQuantities: function(){
      var vm = this;
      this.$http.get('pull_quantities',{
	      phase_id: Number(5)
      }).then(response => {
        vm.pull_quantities = response.body;
      },response =>{
        //error
      })
      this.phase_id =  null
      this.alert_pull_quantities = true
    }, 


  } //closed methods
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin-top: 10px;
}
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
