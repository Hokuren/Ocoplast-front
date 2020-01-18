<template>
  <div id="Inventary">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="text-left">Producto</th>
          <th scope="col" v-for="(phase, index) in phases" :key="index" class="text-left">{{ phase.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr scope="row" v-for="(product, index) in products" :key="index">
          <th class="text-left">{{ product.name }} </th>
          <td v-for="(phase, index) in phases" :key="index">
            <p class="text-left">Peso: {{ mapArrayInventaryWeight(product.id,phase.id) }} (Kg)<br>
            Costo: {{ mapArrayInventaryCost(product.id,phase.id) }} (Kg)</p>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <div>
      <h3>Parametros</h3>
      <p> phase_id: {{ phase_id }} </p>
      <p> product_id: {{ product_id }} </p>
      <p> phase_quantities: {{ phase_quantities }} </p>
    </div>
 -->


  </div> 
</template> 

<script>

export default {
  name: 'Inventary',
  data () {
    return {
      products: [],
      phases: [],
      phase_quantities: [],
      phase_id: null,
      product_id: null
    }
  },
  mounted () {
    this.getProducts();
    this.getPhases();
    this.post_phase_quantities();
  },
  beforeUpdate () {

  },
  methods: {
    getProducts: function() {
      this.$http.get('products').then(response => {
        this.products = response.body;
      },response => {
        //error
      })
    },
    getPhases: function() {
      this.$http.get('phases').then(response => {
        this.phases = response.body;
        this.phases.splice( this.phases.indexOf('Pool'), 1 );
      },response => {
        //error
      })
    },
    post_phase_quantities: function(){
      this.$http.post('phase_quantities',{
        phase_id: this.phase_id,
	      product_id: this.product_id
      }).then(response => {
        this.phase_quantities = response.body;
      },response =>{
        //error
      })
      this.phase_id =  null
      this.product_id = null
    }, 
    mapArrayInventaryWeight: function(f_product_id,f_phase_id){
      var cost_phase = 0
      var weight_phase = 0
      var cost_total = 0
      for(var phase_quantitie in this.phase_quantities) {
        if (this.phase_quantities[phase_quantitie].products.product_id === f_product_id) {
          for(var phase in this.phase_quantities[phase_quantitie].products.phases){
            if(this.phase_quantities[phase_quantitie].products.phases[phase].phase_id === f_phase_id){
              cost_phase = this.phase_quantities[phase_quantitie].products.phases[phase].cost
              weight_phase = this.phase_quantities[phase_quantitie].products.phases[phase].weight
              cost_total = (cost_phase * weight_phase)
            }
          } 
        }
      } 
      return weight_phase;
    },
    mapArrayInventaryCost: function(f_product_id,f_phase_id){
      var cost_phase = 0
      var weight_phase = 0
      var cost_total = 0
      for(var phase_quantitie in this.phase_quantities) {
        if (this.phase_quantities[phase_quantitie].products.product_id === f_product_id) {
          for(var phase in this.phase_quantities[phase_quantitie].products.phases){
            if(this.phase_quantities[phase_quantitie].products.phases[phase].phase_id === f_phase_id){
              cost_phase = this.phase_quantities[phase_quantitie].products.phases[phase].cost
              weight_phase = this.phase_quantities[phase_quantitie].products.phases[phase].weight
              cost_total = (cost_phase * weight_phase)
            }
          } 
        }
      }
      return cost_phase;
    }
    

  }  //closed methods
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin-top: 0px;
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
