<template>
  <div id="Classification">
    <div class="container">
      <div class="row">

        <div class="col-7">
          <h3>Clasificacíon</h3>
          <form v-on:submit.prevent="postProductTreatmentPhaseClassification">
            <div class="form-group text-left">
              <label for="inputPassword3">Producto</label>
              <select class="form-control" v-model="product_id" required>
                  <option v-for="product in products" 
                          :key="product.id" 
                          :value="product.id"
                          class="form-control">{{ product.name }}</option>
              </select> 
            </div>
            <div class="form-group text-left">
              <label for="inputPassword3">Fase de Origen</label>
              <select class="form-control" v-model="phase_id_previous" required>
                  <option :value="phases[0].id" class="form-control">{{ phases[0].name }}</option>
              </select> 
            </div>
            <div class="form-group text-left">
              <label for="formGroupExampleInput2">Peso a Clasificar (Kg)</label>
              <!--<input type="number" class="form-control" min="1" pattern="^[0-9]+" placeholder="Peso en Kilos" v-model="weight_classification" required>-->
              <vue-numeric  class="form-control"  separator="." v-model="weight_classification" required placeholder="Peso en Kilos"></vue-numeric>
            </div>
            <div class="form-group text-left">
              <label for="formGroupExampleInput2">Nombre del Tratamiento</label>
              <input type="text" class="form-control" placeholder="Nombre de Tratamientos" v-model="name_classification" required disabled>
            </div>
            <div class="form-group text-left">
              <label for="formGroupExampleInput2">Costo Clasificación</label>
              <!--<input type="number" class="form-control" min="0" pattern="^[0-9]+" placeholder="Peso en Kilos" v-model="cost_classification" required>-->
              <vue-numeric  class="form-control" currency="$" separator="." v-model="cost_classification" required placeholder="Costo Clasificacion"></vue-numeric>
                  
            </div>
        
            <div class="form-group text-left">
              <div v-if="count_classification > 0 ">
                <div v-for="(product_classificacion, index) in product_classificacions" :key="product_classificacion.id">
                  <div class="card">
                    <div class="card-body text-left">
                      <div class="form-group text-left" >
                        <label for="">Cantidad a Clasificar</label>
                        <!--<input type="number" min="1" pattern="^[0-9]+" v-model.number="product_classificacion.weight" required> -->
                        <vue-numeric  class="form-control" separator="." v-model="product_classificacion.weight" required placeholder="Cantidad a Clasificar"></vue-numeric>
                
                        <button type="submit" class="btn btn-danger" @click="removeClassificacion(index)"> - </button>
                        <br>
                        <label for="">Producto a Clasificar</label>
                        <select class="form-control" v-model="product_classificacion.product_id">
                          <option v-for="product in products" 
                          :key="product.id" 
                          :value="product.id"
                          class="form-control"
                          v-model="classification_product_id"
                          required >{{ product.name }}</option>
                        </select> 
                        <br>
                        <label for="">Fase de Destino</label>
                        <select class="form-control"  v-model="product_classificacion.phase_id">
                          <option v-for="phase in phases" 
                          :key="phase.id" 
                          :value="phase.id"
                          class="form-control"
                          v-model="phase_id"
                          required >{{ phase.name }}</option>
                        </select> 
                      </div>
                    </div>
                  </div>
                  <br>
                </div>
              </div>
              
              <label for="formGroupExampleInput2">Clasificación ({{ count_classification }})</label>
              <button type="submit" class="btn btn-success" @click="addClassification"> + </button>
              <br>

            </div>

            <div class="form-group row">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Clasificar</button>
                </div>
            </div>

          </form>  

          <div class="alert alert-primary" role="alert" v-if="alert_post_classification">
              <p>Notificación</p>
              <p>Peso: {{ product_treatment_phase.weight }}  Kg</p>
              <p>Costo: {{ product_treatment_phase.cost }}  Kg</p>
          </div> 
<!-- 
          <div>
            <h3>Parametros</h3>
            <p>Product_id: {{ product_id }}</p>
            <p>peso en K/G{{ weight_classification }}</p>
            <p>Costo Classification: {{ cost_classification }}</p>
            <p>Nombre Classification: {{ name_classification }}</p>
            <p>Fase anterior: {{ phase_id_previous }}</p>
            <p>Product classificacions: {{ product_classificacions }}</p>
            <p>product_treatment_phase: {{ product_treatment_phase }}</p>
          </div> -->

        </div> <!-- Col 9-->
      </div> <!-- Closed row -->
    </div> <!-- Closed Container -->
  </div> <!-- Closed Classification -->
</template> 


<script>

import Vue from 'vue';
import VueNumeric from 'vue-numeric';

Vue.use(VueNumeric);

export default {
   components: { 
    VueNumeric,
  },
  name: 'Classification',
  data () {
    return {
      weight_classification: Number,
      cost_classification: '',
      name_classification: 'Clasificación',
      phases: [],
      products: [],
      count_classification: 0,
      product_classificacions: [],
      product_id: '',
      phase_id_previous: '',
      phase_id: '',
      classification_product_id: '',
      alert_post_classification: false,
      product_treatment_phase: []
    }
  },
  mounted () {
    this.getPhases();
    this.getProducts();
  },
  beforeUpdate () {

  },
  methods: {
    getPhases: function() {
      this.$http.get('http://localhost:3000/phases').then(response => {
        this.phases = response.body;
        this.phases.splice( this.phases.indexOf('Pool'), 1 );
      },response => {
        //error
      })
    },
    getProducts: function() {
      this.$http.get('http://localhost:3000/products').then(response => {
        this.products = response.body;
      },response => {
        //error
      })
    },
    addClassification: function() {
      this.count_classification++;
      this.addProductClassificacion();
      console.log("presionado el addClassification")
    },
    addProductClassificacion: function(){
      console.log("presionado el addProductClassificacion")
      this.product_classificacions.push(
        {
          weight: null, 
    	    phase_id: null,
    	    product_id: null
        } 
      );
    },
    removeClassificacion: function(index) {
      if (this.count_classification > 0) {
        this.count_classification--; 
      }
      this.product_classificacions.splice(index,1);
    },
    postProductTreatmentPhaseClassification: function() {
      this.$http.post('http://localhost:3000/product_treatment_phases/classification',{
        weight_inventary: Number(this.weight_classification),
        weight: null,
        cost:  null,
        cost_treatments: Number(this.cost_classification),
        name_treatments: this.name_classification,
        phase_id: this.phase_id_previous,
        product_id: Number(this.product_id),
        product_treatment_phase_id: null,
        classification: this.product_classificacions
      }).then(response => {
        this.product_treatment_phase = response.body;
      },response => {
        this.error_product_treatment_phase = response;
      });
        this.weight_classification = ''
        this.cost_classification = ''
        this.phase_id_previous = ''
        this.classification_product_id = ''
        this.product_classificacions = []
        this.alert_post_classification = true;
      var vmm = this;
      setTimeout(function(){ vmm.alert_post_classification = false }, 3000);
    }

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
