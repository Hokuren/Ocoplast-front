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
              <input class="form-control" min="0" pattern="^[0-9].+" placeholder="Peso en Kilos" @input="dotFilterWeightClassification()" v-model="weight_classification" required>
              <!-- <vue-numeric  class="form-control"  separator="." v-model="weight_classification" required placeholder="Peso en Kilos"></vue-numeric> -->
            </div>
           <div class="form-group text-left">
              <label for="formGroupExampleInput2">Desperdicio</label>
              <input  class="form-control" min="0" pattern="^[0-9].+" @input="dotFilterWaste()" v-model="waste"  required>
            </div>
            <div class="form-group text-left">
              <label for="formGroupExampleInput2">Costo Clasificacion Por (Kg)</label>
              <input  class="form-control" min="0" pattern="^[0-9].+" :placeholder="cost_classification.cost" disabled>
            </div>
            <div class="form-group text-left">
              <label for="formGroupExampleInput2">Costo Total Clasificacion</label>
              <input  class="form-control" min="0" pattern="^[0-9].+"  
                      :placeholder="cost_classification_total"
                      disabled
              >
            </div>
    
    

            <!--
            <div class="form-group text-left">
              <label for="formGroupExampleInput2">Nombre del Tratamiento</label>
              <input type="text" class="form-control" placeholder="Nombre de Tratamientos" v-model="name_classification" required disabled>
            </div>
            <div class="form-group text-left">
              <label for="formGroupExampleInput2">Costo Clasificación</label>
              <input class="form-control" min="0" pattern="^[0-9].+" placeholder="Peso en Kilos" @input="dotFilterCostClassification()" v-model="cost_classification" required>
              <vue-numeric  class="form-control" currency="$" separator="." v-model="cost_classification" required placeholder="Costo Clasificacion"></vue-numeric>    
            </div>
            -->

            <!-- treatments -->
<!--             <div class="form-group text-left">
              <p>Tratamientos</p>

              <br>
              <div v-if="count_treatment > 0 ">
                <div v-for="(product_treatments_attribute, index) in product_treatments_attributes" :key="product_treatments_attribute.id">
                  <div class="card col-sm-8">
                    <div class="card-body text-left">
                      <div class="form-group text-left" >
                        <label for="">Nombre del Tratamiento</label>
                          <select class="col-sm-8" @change="validateCostTreatment(index,$event)" v-model="product_treatments_attribute.treatment_id" v-if="!product_treatments_attribute.checkbox_treatment">
                            <option v-for="(treatment, index_treatment) in treatments" 
                            :key="index_treatment" 
                            :value="treatment.id"
                            class="form-control col-sm-6"
                            v-model="treatment_id"
                            >{{ treatment.name }}</option>
                          </select> 
                        <div>
                          <p>
                            <input type="checkbox" 
                                    v-model="product_treatments_attribute.checkbox_treatment"
                                    @change="validate_product_treatments_attributes_id(index)">
                            Nuevo Tratamiento
                            <input  class="col-sm-6" type="text" v-if="product_treatments_attribute.checkbox_treatment" v-model="product_treatments_attribute.name_treatment" >
                            <button type="submit" class="btn btn-danger" @click="removeTreatment(index)"> - </button>
                          </p>
                        </div>  
                        <label for="">Costo del Tratamiento</label>
                        <input min="0" 
                                class="form-control col-sm-6" 
                                pattern="^[0-9].+" 
                                @blur="validateInputCostTreatment(  product_treatments_attribute.cost_treatment , index  )"
                                @input="dotFilterCostTreatment( product_treatments_attribute.cost_treatment , index )" 
                                v-model="product_treatments_attribute.cost_treatment"  
                                placeholder="Costo del Tratamiento" required>
                    
                        <div class="alert alert-danger" v-if="product_treatments_attribute.alert">
                          <strong>Alerta!</strong> {{ message_modal_validate_input_cost_treatment }}
                          <br>
                          <button class="btn btn-danger" @click="product_treatments_attribute.alert=false">Aceptar</button>
                        </div>

                      </div>
                    </div>
                  </div>
                  <br>
                </div>
              </div>
              <label for="formGroupExampleInput2">Tratamientos ({{ count_treatment }})</label>
              <button type="submit" class="btn btn-info" @click="addTreatment"> + </button>
              <br>

            </div> -->

            <!-- finish treatmets -->

            <div class="form-group text-left">
              <div v-if="count_classification > 0 ">
                <div v-for="(product_classificacion, index) in product_classificacions" :key="product_classificacion.id">
                  <div class="card">
                    <div class="card-body text-left">
                      <div class="form-group text-left" >
                        <label for="">Cantidad a Clasificar (Kg)</label>
                        <input class="form-control" min="1" pattern="^[0-9].+" @input="dotFilterProductClassificacion(product_classificacion.weight,index)" v-model="product_classificacion.weight" placeholder="Cantidad a Clasificar" required> 
                        <!-- <vue-numeric  class="form-control" separator="." v-model="product_classificacion.weight" required placeholder="Cantidad a Clasificar"></vue-numeric> -->
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

          
          <div>
            <h3>Parametros</h3>
            <p>cost_classification: {{ cost_classification }}</p>
            <p>cost_classification_total: {{ cost_classification_total }}</p>
            <p>product_treatments_attributes {{ product_treatments_attributes }}</p>
            <p>Product_id: {{ product_id }}</p>
            <p>peso en K/G{{ weight_classification }}</p>
            <p>Costo Classification: {{ cost_classification }}</p>
            <p>Nombre Classification: {{ name_classification }}</p>
            <p>Fase anterior: {{ phase_id_previous }}</p>
            <p>Product classificacions: {{ product_classificacions }}</p>
            <p>product_treatment_phase: {{ product_treatment_phase }}</p>
          </div>
         

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
      weight_classification: '',
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
      product_treatment_phase: [],
      count_treatment: 0,
      product_treatments_attributes: [],
      treatments: [],
      cost_classification_total: '',
      waste: '',
      
    }
  },
  mounted () {
    this.getPhases();
    this.getProducts();
    this.getTreatments();
    this.getCostClassification();
  },
  beforeUpdate () {

  },
  methods: {
    dotFilterProductClassificacion (NewValue,index){  
      var index = index 
      var NewValueTwo = NewValue
      var value = String(NewValueTwo).replace(/[.']/g,'')
      var finalValue = value.replace(/[.']/g,'');
      if(value.length >= 7){
          finalValue=value.substring(0,value.length-6)+"'"+value.substring(value.length-6,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        else if(value.length >= 4){
          finalValue=value.substring(0,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
      this.product_classificacions[index].weight = finalValue
    },
    dotFilterWeightClassification(){
      this.cost_classification_total = this.cost_classification.cost * Number(this.weight_classification.replace(/[.']/g,'') ) 
      var value = String(this.weight_classification.replace(/[.']/g,''));
      var finalValue = value.replace(/[.']/g,'');
      if(value.length >= 7){
        finalValue=value.substring(0,value.length-6)+"'"+value.substring(value.length-6,value.length-3)+"."+value.substring(value.length-3,value.length);
      }
      else if(value.length >= 4){ 
        finalValue=value.substring(0,value.length-3)+"."+value.substring(value.length-3,value.length);
      }
      this.weight_classification = finalValue;
    },
    dotFilterCostClassification(){
      var value = String(this.cost_classification.replace(/[.']/g,''));
      var finalValue = value.replace(/[.']/g,'');
      if(value.length >= 7){
        finalValue=value.substring(0,value.length-6)+"'"+value.substring(value.length-6,value.length-3)+"."+value.substring(value.length-3,value.length);
      }
      else if(value.length >= 4){ 
        finalValue=value.substring(0,value.length-3)+"."+value.substring(value.length-3,value.length);
      }
      this.cost_classification = finalValue;
    },
    dotFilterCostTreatment(NewValue,index){
      var index = index 
      var NewValueTwo = NewValue
      var value = String(NewValueTwo).replace(/[.']/g,'')
      var finalValue = value.replace(/[.']/g,'');
      if(value.length >= 7){
          finalValue=value.substring(0,value.length-6)+"'"+value.substring(value.length-6,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        else if(value.length >= 4){
          finalValue=value.substring(0,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
      this.product_treatments_attributes[index].cost_treatment = finalValue
    },
    dotFilterWaste(){
      var value = String(this.waste.replace(/[.']/g,''));
      var finalValue = value.replace(/[.']/g,'');
      if(value.length >= 7){
          finalValue=value.substring(0,value.length-6)+"'"+value.substring(value.length-6,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        else if(value.length >= 4){
          finalValue=value.substring(0,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        this.waste = finalValue;
    },
    getPhases: function() {
      this.$http.get('phases').then(response => {
        this.phases = response.body;
        this.phases.splice( this.phases.indexOf('Pool'), 1 );
      },response => {
        //error
      })
    },
    getProducts: function() {
      this.$http.get('products').then(response => {
        this.products = response.body;
      },response => {
        //error
      })
    },
    getCostClassification: function() {
      this.$http.get('costs/7').then(response => {
        this.cost_classification = response.body;
      },response => {
        //error
      })
    },
    addClassification: function() {
      this.count_classification++;
      this.addProductClassificacion();
    },
    addProductClassificacion: function(){
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

      this.addTreatmentCostClassification();
      this.cleanArrayProductClassificacions();
      this.cleanArrayProductTreatmentPhase();

      this.$http.post('product_treatment_phases/classification',{
        weight_inventary: Number(this.weight_classification.replace(/[.']/g,'')),
        weight: null,
        cost:  null,
        //cost_treatments: Number(this.cost_classification.replace(/[.']/g,'')),
        //name_treatments: this.name_classification,
        treatments: this.product_treatments_attributes,
        phase_id: this.phase_id_previous,
        product_id: Number(this.product_id),
        product_treatment_phase_id: null,
        waste: Number(this.waste.replace(/[.']/g,'')),
        classification: this.product_classificacions
      }).then(response => {
        this.product_treatment_phase = response.body;

        this.weight_classification = '';
        this.cost_classification = '';
        this.phase_id_previous = '';
        this.classification_product_id = '';
        this.product_classificacions = [];
        this.alert_post_classification = true;
      },response => {
        this.error_product_treatment_phase = response;
      });
      var vmm = this;
      setTimeout(function(){ vmm.alert_post_classification = false }, 3000);
    },
    cleanArrayProductTreatmentPhase: function(){
      var newcost = 0
      for(var index in this.product_treatments_attributes) {
        newcost = String(this.product_treatments_attributes[index].cost_treatment)
        this.product_treatments_attributes[index].cost_treatment = Number(newcost.replace(/[.']/g,''))
      }
    }, 
    cleanArrayProductClassificacions: function(){
      var newWeight = 0
      for(var index in this.product_classificacions) {
        newWeight = String(this.product_classificacions[index].weight)
        this.product_classificacions[index].weight = Number(newWeight.replace(/[.']/g,''))
      }
    }, 
    addTreatmentCostClassification: function(){
      console.log('ddTreatmentCostClassification()')
      this.product_treatments_attributes.push(
        {
          treatment_id: null,
          name_treatment: "MANO DE OBRA CLASIFICACIÓN Y ALISTAMIENTO (SELECCIÓN Y PICADO)",
          cost_treatment: Number(String(this.cost_classification_total).replace(/[.']/g,'')),
          minimal_cost: null,
          maximum_cost: null,
          alert: false
        } 
      );
    },
    // añadir tratamiento 
    addTreatment: function() {
      this.count_treatment++;
      this.addProductTreatmentsAttributes();
    },
    removeTreatment: function(index) {
      if (this.count_treatment > 0) {
        this.count_treatment--; 
      }
      this.product_treatments_attributes.splice(index,1);
    },
    addProductTreatmentsAttributes: function(){
      this.product_treatments_attributes.push(
        {
          treatment_id: null,
          name_treatment: null,
          cost_treatment: null,
          minimal_cost: null,
          maximum_cost: null,
          alert: false
        } 
      );
    },
    getTreatments: function() {
      this.$http.get('treatments').then(response => {
        this.treatments = response.body;
      },response => {
        //error
      })
    },
    validate_product_treatments_attributes_id: function(index){
      if(this.product_treatments_attributes[index].checkbox_treatment) {
        this.product_treatments_attributes[index].treatment_id = null;
      }
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
