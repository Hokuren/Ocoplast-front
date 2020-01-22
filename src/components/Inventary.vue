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
        <tr scope="row" v-for="(product, index_p) in products" :key="index_p">
          <th class="text-left">{{ product.name }} 
          </th>
          <td v-for="(phase, index) in phases" :key="index">
            <p class="text-left">
              Peso: {{ mapArrayInventaryWeight(product.id,phase.id) }} (Kg)<br>
              Costo: {{ mapArrayInventaryCost(product.id,phase.id) }} (Kg)
            </p>
            <div class="text-left" v-if="index_p === products.length - 1">
              <h4>Gastos Mensuales</h4>
              <ul v-for="(period_cost_phase, index_pcp) in period_cost_phases" :key="index_pcp">
                <li v-if="period_cost_phase.phase.id === phase.id && period_cost_phase.type_cost === 'porcentage' ">
                  {{ period_cost_phase.cost.name }} <br>
                  Valor: ${{ (period_cost_phase.cost.cost * period_cost_phase.porcentage) / 100 }} <br>
                  Porcentaje: {{ period_cost_phase.porcentage }} % <br>
                  <!-- Tipo: {{ period_cost_phase.type_cost }} <br>
                  Fase: {{ period_cost_phase.phase.name }} <br> -->
                  {{ calculateIncrementKilo((period_cost_phase.cost.cost * period_cost_phase.porcentage) / 100 ) }}
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <h3>Parametros</h3>
      <p> period_cost_phases.type_cost: {{ period_cost_phases[0].type_cost }} </p>
      <p> period_cost_phases: {{ period_cost_phases }}</p>
      <p> phase_id: {{ phase_id }} </p>
      <p> product_id: {{ product_id }} </p>
      <p> phase_quantities: {{ phase_quantities }} </p>
    </div>



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
      product_id: null,
      period_cost_phases: ''
    }
  },
  mounted () {
    this.getProducts();
    this.getPhases();
    this.post_phase_quantities();
    this.getPeriodCostPhases();
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
    getPeriodCostPhases: function() {
      this.$http.get('period_cost_phases').then(response => {
        this.period_cost_phases = response.body;
        //this.phases.splice( this.phases.indexOf('Pool'), 1 );
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
    },
    calculateIncrementKilo: function(cost,weight){
      var cost = cost
      var weight = weight 
      var total_cost = total_cost + cost
      var total_weight = total_weight + weight
      var increment_kilo = (total_cost / total_weight)
      return increment_kilo
      console.log('calculateIncrementKilo() ', increment_kilo)
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
  font-size: 13px; 
}
a {
  color: #42b983;
}
</style>
