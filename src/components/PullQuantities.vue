<template>
  <div id="PullQuantities">


    <h3>Pool Quantities</h3>
      <div class="container">
        <div class="row">
          <div class="col-3">
              <form v-on:submit.prevent="postPullQuantities" >
                <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label">Fase</label>
                <select class="col-sm-8" v-model="phase_id" required>
                    <option v-for="phase in phases" :key="phase.id" :value="phase.id">{{ phase.name }}</option>
                </select> 
                </div>  
           
                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">Buscar</button>
                    </div>
                </div>
              </form>
          </div> 

          <div class="col-4" v-if="alert_pull_quantities">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Pull</th>
                </tr>
              </thead>
              <tbody>
                <tr scope="row" >
                  <td v-for="(pull_quantities, index) in pull_quantities" :key="index">
                    <h3>{{ pull_quantities.product.name }}</h3>
                    <hr>
                    <p>fase id: {{ pull_quantities.phase.phase_id }}
                    <p>fase nombre: {{ pull_quantities.phase.name }}
                    <p>Costo: {{ pull_quantities.group_by_product.cost }}
                    <p>Peso: {{ pull_quantities.group_by_product.weight }}                       
                    </p>
                    <hr>
                    <h5>Productos Ponderados</h5>
                    <p v-for="(product, index) in pull_quantities.group_by_product.product_id" :key="index"> 
                      Product_id: {{ product[index] }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

     
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
    this.getPhases();
  },
  beforeUpdate () {

  },
  methods: {
    getPhases: function() {
      this.$http.get('http://localhost:3000/phases').then(response => {
        this.phases = response.body;
      },response => {
        //error
      })
    },
    postPullQuantities: function(){
      var vm = this;
      this.$http.post('http://localhost:3000/pull_quantities',{
	      phase_id: this.phase_id
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
