<template>
  <div id="Inventary">
    <div class="container">
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
    </div>

    <!-- <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col" v-for="(phase_quantitie, index) in phase_quantities" :key="index">{{ phase_quantitie.phase.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td v-for="(phase_quantitie, index) in phase_quantities" :key="index">{{ phase_quantitie.product.name }} || {{ phase_quantitie.cost }} || {{ phase_quantitie.weight }} || {{ phase_quantitie.phase.name }}</td>
        </tr>
      </tbody>
    </table> -->

    <table class="table">
        <tr v-for="(phase_quantitie, index) in phase_quantities" :key="index">
          <td v-for="(phase_quantitie, index) in phase_quantities" :key="index">{{ phase_quantitie.product.name }} || {{ phase_quantitie.cost }} || {{ phase_quantitie.weight }} || {{ phase_quantitie.phase.name }}</td>
        </tr>
    </table>


    <div>
      <h3>Parametros</h3>
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
      product_id: null
    }
  },
  mounted () {
    this.getProducts();
    this.getPhases();
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
    detail_phase_quantities: function(){

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
