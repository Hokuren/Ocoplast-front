<template>
    <div id="PeticionAjax">

      <div class="container">
        <div class="row">
          
          <div class="col-9">
              <form v-on:submit.prevent="postProductTreatmentPhase">
                  <div class="form-group text-left">
                    <label for="inputPassword3">Producto</label>
                    <select class="col-sm-8 form-control" v-model="f_product_id" required>
                        <option v-for="product in products" 
                                :key="product.id" 
                                :value="product.id"
                                class="form-control">{{ product.name }}</option>
                    </select> 
                  </div>
                  <div class="form-group text-left">
                    <label for="inputPassword3">Fase de Origen</label>
                    <select class="col-sm-8 form-control" v-model="phase_id_previous" required>
                        <option v-for="phase in phases" 
                                :key="phase.id" 
                                :value="phase.id"
                                class="form-control">{{ phase.name }}</option>
                    </select> 
                  </div>
                  <div class="form-group text-left">
                    <label for="inputPassword3">Fase de Destino</label>
                    <select class="col-sm-8 form-control" v-model="phase_id" required>
                        <option v-for="phase in phases" 
                                :key="phase.id" 
                                :value="phase.id"
                                class="form-control">{{ phase.name }}</option>
                    </select> 
                  </div>
                  <div class="form-group text-left">
                      <label for="formGroupExampleInput2">Peso en Kg</label>
                      <input class="form-control col-sm-8" min="0" pattern="^[0-9].+" @input="dotFilterWeightPhase()" v-model="weight_phase" required>
                      <!-- <vue-numeric  class="form-control col-sm-8"  separator="." v-model="weight_phase" required placeholder="Peso en Kilos" ></vue-numeric> -->
                  </div>
                  <div class="form-group text-left">
                      <label for="formGroupExampleInput2">Desperdicio</label>
                      <input  class="form-control col-sm-8" min="0" pattern="^[0-9].+" @input="dotFilterWaste()" v-model="waste"  required>
                  </div>
    
                  <div class="form-group text-left">
                   
                      <!-- <br>
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
                                  <input  class="col-sm-6" type="text" v-if="product_treatments_attribute.checkbox_treatment" v-model="product_treatments_attribute.treatment_new_name" >
                                  <button type="submit" class="btn btn-danger" @click="removeTreatment(index)"> - </button>
                                </p>
                               </div>  
                              <label for="">Costo del Tratamiento</label>
                              <input min="0" 
                                      class="form-control col-sm-6" 
                                      pattern="^[0-9].+" 
                                      @blur="validateInputCostTreatment(  product_treatments_attribute.cost , index  )"
                                      @input="dotFilterCostTreatment( product_treatments_attribute.cost , index )" 
                                      v-model="product_treatments_attribute.cost"  
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
                      <button type="submit" class="btn btn-success" @click="addTreatment"> + </button>
                      <br> -->
                      
                  </div>

                  <div class="form-group row">
                      <div class="col-sm-10">
                          <button type="submit" class="btn btn-primary">Procesar</button>
                      </div>
                  </div>

              </form>  

              <div class="alert alert-primary" role="alert" v-if="alert_post_product_treatment_phase">
                <p>Notificación</p>
                <p>Peso: {{ product_treatment_phase.weight }}  Kg</p>
                <p>Costo: {{ product_treatment_phase.cost }}  Kg</p>
              </div>

              
              <div>
                <p>
                  waste: {{ waste }}
                  <br>
                  weight: {{ weight_phase }},
                  <br>  
                  phase_id_previous: {{ phase_id_previous }},
                  <br>
                  phase_id: {{ phase_id }},
                  <br>
                  product_id: {{ f_product_id }},
                  <br>
                  product_treatments_attributes: {{ product_treatments_attributes }}
                </p>
              </div>

          </div>
        </div>
      </div>

  </div> <!-- closed PeticionAjax -->
</template> 

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Vue from 'vue';
import VueNumeric from 'vue-numeric';

Vue.use(VueNumeric);

export default {
  components: { 
    DatePicker,
    VueNumeric,
  },
  name: 'PeticionAjax',
  data () {
    return {
      arlert_post_quantity: false,
      alert_post_product_treatment_phase: false,
      alert_add_quantity: [],
      quantity: [],
      products: [],
      product_id: '',
      date: '',
      cost: '',
      weight: '',
      phases: [],
      f_product_id: '',
      phase_id_previous: '',
      phase_id: '',
      weight_phase: '',
      count_treatment: 0,
      treatments: [],
      checkbox_treatment: false,
      product_treatments_attributes: [],
      treatment_id: null,
      treatment_new_name: null,
      treatment_cost: null,
      product_treatment_phase: [],
      error_product_treatment_phase: [],
      product_treatments_attributes_two: [], 
      message_modal_validate_input_cost_treatment: '',
      waste: ''
    }
  },
  mounted () {
    this.getProducts();
    this.getPhases();
    this.getTreatments();
  },
  beforeUpdate () {

  },
  methods: {
    dotFilterWeightPhase(){
      var value = String(this.weight_phase.replace(/[.']/g,''));
      var finalValue = value.replace(/[.']/g,'');
      if(value.length >= 7){
          finalValue=value.substring(0,value.length-6)+"'"+value.substring(value.length-6,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        else if(value.length >= 4){
          finalValue=value.substring(0,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        this.weight_phase = finalValue;
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
      this.product_treatments_attributes[index].cost = finalValue
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
    getProducts: function() {
      this.$http.get('products').then(response => {
        this.products = response.body;
      },response => {
        //error
      })
    },
    getTreatments: function() {
      this.$http.get('treatments').then(response => {
        this.treatments = response.body;
      },response => {
        //error
      })
    },
    postQuantities: function() {
      this.$http.post('quantities',{
        weight: this.weight,
        cost: this.cost,
        product_id: this.product_id,
        date: this.date
      }).then(response => {
        this.alert_add_quantity = response.body;
      },response => {
        //error
      });
      this.product_id = '';
      this.cost = '';
      this.weight = '';
      this.date = '';
      this.arlert_post_quantity = true;
      var vm = this;
      setTimeout(function(){ vm.arlert_post_quantity = false }, 3000);
    },
    postProductTreatmentPhase: function() {
      var vmm = this;
      this.cleanArrayProductTreatmentPhase(); 
      this.$http.post('product_treatment_phases',{
        weight: Number(this.weight_phase.replace(/[.']/g,'')),
        phase_id_previous: this.phase_id_previous,
        phase_id: this.phase_id,
        product_id: this.f_product_id,
        product_treatment_phase_id: null,
        waste: Number(this.waste.replace(/[.']/g,'')),
        product_treatments_attributes: this.product_treatments_attributes
      }).then(response => {
        this.product_treatment_phase = response.body;
        this.weight_phase = ''
        this.phase_id_previous = ''
        this.phase_id = ''
        this.f_product_id = ''
        this.count_treatment = 0
        // this.product_treatments_attributes = []
        this.alert_post_product_treatment_phase = true 
        setTimeout(function(){ vmm.alert_post_product_treatment_phase = false }, 3000);
      },response => {
        this.error_product_treatment_phase = response;
      });
    },
    cleanArrayProductTreatmentPhase: function(){
      var newcost = 0
      for(var index in this.product_treatments_attributes) {
        newcost = String(this.product_treatments_attributes[index].cost)
        this.product_treatments_attributes[index].cost = Number(newcost.replace(/[.']/g,''))
      }
    }, 
    getPhases: function() {
      this.$http.get('phases').then(response => {
        this.phases = response.body;
        this.phases.splice( this.phases.indexOf('Pool'), 1 );
      },response => {
        //error
      })
    },
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
          cost: null,
          treatment_id: null,
          treatment_new_name: null,
          checkbox_treatment: false,
          minimal_cost: null,
          maximum_cost: null,
          alert: false
        } 
      );
    },
    validate_product_treatments_attributes_id: function(index){
      if(this.product_treatments_attributes[index].checkbox_treatment) {
        this.product_treatments_attributes[index].treatment_id = null;
      }
    },
    validateCostTreatment: function(index,treatment_id){
      var treatment_id = treatment_id.target.value
      var index_treatment = this.treatments.findIndex(treatment => treatment.id === Number(treatment_id))
      this.product_treatments_attributes[index].minimal_cost = Number(this.treatments[index_treatment].minimal_cost)
      this.product_treatments_attributes[index].maximum_cost = Number(this.treatments[index_treatment].maximum_cost)
    },
    validateInputCostTreatment: function(cost, index){
      var cost = Number(cost.replace(/[.']/g,''))
      var name = this.treatments[index].name
      var min_cost = Number(this.treatments[index].minimal_cost)
      var max_cost = Number(this.treatments[index].maximum_cost)
      if (cost >= min_cost && cost <= max_cost) {
      } else {
        this.message_modal_validate_input_cost_treatment = 'El valor del tratamiento: ' + name + ' no esta en el rango \n valor minimo: ' + min_cost + '\n valor maximo: ' + max_cost + '\n';
        this.product_treatments_attributes[index].alert = true;
      }
    },
    
    
  }
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
