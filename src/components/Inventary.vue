<template>
  <div id="Inventary">
    <!-- <div class="container">
      <div class="row">
        <div class="col-4">
          <form v-on:submit.prevent="post_phase_quantities">
            <div class="form-group text-left">
              <label for="inputPassword3">Fase Anterior</label>
              <select class="col-sm-8" v-model="phase_id">
                  <option v-for="phase in phases" 
                          :key="phase.id" 
                          :value="phase.id"
                          class="form-control">{{ phase.name }}</option>
              </select> 
            </div>
            <div class="form-group text-left">
              <label for="inputPassword3">Producto</label>
              <select class="col-sm-8" v-model="product_id">
                  <option v-for="product in products" 
                          :key="product.id" 
                          :value="product.id"
                          class="form-control">{{ product.name }}</option>
              </select> 
            </div>
            <div class="form-group row">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Buscar</button>
                </div>
            </div>
        </form>  
        </div>
      </div>
    </div> -->

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Producto</th>
          <th scope="col" v-for="(phase, index) in phases" :key="index">{{ phase.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr scope="row" v-for="(product, index) in products" :key="index">
          <th>{{ product.name }} (id: {{ product.id }})</th>
          <td v-for="(phase, index) in phases" :key="index">
          {{ mapArrayInventary(product.name,phase.id) }}</td>
          <!-- <td v-for="(phase_quantitie, index) in phase_quantities" :key="index">{{ phase_quantitie.product.name }}</td> -->
        </tr>
      </tbody>
    </table>

    <!-- <div>
      <h3>Parametros</h3>
      <p> phase_id: {{ phase_id }} </p>
      <p> product_id: {{ product_id }} </p>
      <p> phase_quantities: {{ phase_quantities }} </p>
    </div> -->



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
      this.$http.get('http://localhost:3000/products').then(response => {
        this.products = response.body;
      },response => {
        //error
      })
    },
    getPhases: function() {
      this.$http.get('http://localhost:3000/phases').then(response => {
        this.phases = response.body;
      },response => {
        //error
      })
    },
    post_phase_quantities: function(){
      this.$http.post('http://localhost:3000/phase_quantities',{
        phase_id: this.phase_id,
	      product_id: this.product_id
      }).then(response => {
        console.log(response);
        this.phase_quantities = response.body;
      },response =>{
        //error
      })
      this.phase_id =  null
      this.product_id = null
    }, 
    mapArrayInventary: function(t_product_name,t_phase_id){
      console.log("entro al metodo") 
      var cost_phase = 0
      var weight_phase = 0
      var cost_total = 0
      for(var phase_quantitie in this.phase_quantities) {
        if (this.phase_quantities[phase_quantitie].products.product_name.includes(t_product_name)) {
          for(var phase in this.phase_quantities[phase_quantitie].products.phases){
            if(this.phase_quantities[phase_quantitie].products.phases[phase].phase_id === t_phase_id){
              cost_phase = this.phase_quantities[phase_quantitie].products.phases[phase].cost
              weight_phase = this.phase_quantities[phase_quantitie].products.phases[phase].weight
              cost_total = (cost_phase * weight_phase)
            }
          } 
        }
      }
      var text_r = "costo por K/G: " + cost_phase  + "\n peso: " + weight_phase  + "\n costo total: " + cost_total;
      console.log(text_r);
      return text_r;
    }//closed methods
  }  
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
