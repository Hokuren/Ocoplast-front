<template>
    <div id="PeticionAjax">

      <div class="container">
        <div class="row">
          <div class="col-3">
              <form v-on:submit.prevent="postQuantities" >
                <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label">Producto</label>
                <select class="col-sm-8" v-model="product_id" required>
                    <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
                </select> 
                </div>  
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-4 col-form-label">Fecha</label>
                    <date-picker class="col-sm-8" v-model="date" valueType="format" required></date-picker>
                </div> 
                <!-- Zona de Pruebas -->
                    <!-- <div>
                      <date-picker v-model="time1" valueType="format"></date-picker>
                      <date-picker v-model="time2" type="datetime"></date-picker>
                      <date-picker v-model="time3" range></date-picker>
                    </div>
              -->
                <!-- Zona de Pruebas -->
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-4 col-form-label"> Cantidad </label>
                    <div class="col-sm-8">
                        <input type="Number" class="form-control" min="1" pattern="^[0-9]+"  v-model.number="weight" required>
                    </div>
                </div>       
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-4 col-form-label"> Costo </label>
                    <div class="col-sm-8">
                        <input type="Number" class="form-control" min="1" pattern="^[0-9]+" v-model.number="cost" required>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">Añadir Cantidad</button>
                    </div>
                </div>
              </form> 

          <div class="alert alert-primary" role="alert" v-if="arlert_post_quantity">
            <p>Cantidad Añadida con exito: 
              <br>
              peso: {{ alert_add_quantity.weight }}
              <br>
              Costo: {{ alert_add_quantity.cost }}
            </p>
          </div>
          <!-- <div>
              <h6>Parametros</h6>
              <p>{{ product_id }}</p>
              <p>{{ weight }}</p>
              <p>{{ cost }}</p>
              <p>{{ date }}</p>
              <p>{{ arlert_post_quantity }}</p>
          </div> -->

          </div>
          <div class="col-9">
              <form v-on:submit.prevent="postProductTreatmentPhase">
                  <div class="form-group text-left">
                    <label for="inputPassword3">Fase Anterior</label>
                    <select class="col-sm-8" v-model="phase_id_previous" required>
                        <option v-for="phase in phases" 
                                :key="phase.id" 
                                :value="phase.id"
                                class="form-control">{{ phase.name }}</option>
                    </select> 
                  </div>
                  <div class="form-group text-left">
                    <label for="inputPassword3">Producto</label>
                    <select class="col-sm-8" v-model="f_product_id" required>
                        <option v-for="product in products" 
                                :key="product.id" 
                                :value="product.id"
                                class="form-control">{{ product.name }}</option>
                    </select> 
                  </div>

                  <div class="form-group text-left">
                    <label for="inputPassword3">Phase Actual</label>
                    <select class="col-sm-8" v-model="phase_id" required>
                        <option v-for="phase in phases" 
                                :key="phase.id" 
                                :value="phase.id"
                                class="form-control">{{ phase.name }}</option>
                    </select> 
                  </div>
                  <div class="form-group text-left">
                      <label for="formGroupExampleInput2">Peso en Kg</label>
                      <input type="number" class="form-control" min="1" pattern="^[0-9]+"  placeholder="Peso en Kilos" v-model="weight_phase" required>
                  </div>
                  <div class="form-group text-left">
                      <label for="formGroupExampleInput2">Precio por Kilo</label>
                      <input type="number" class="form-control" min="1" pattern="^[0-9]+"  placeholder="0" disabled>
                  </div>
    
                  <div class="form-group text-left">
                      <label for="formGroupExampleInput2">Tratamientos ({{ count_treatment }})</label>
                      <button type="submit" class="btn btn-success" @click="addTreatment"> + </button>
                      <br>
                      <br>
                      <div v-if="count_treatment > 0 ">
                        <div v-for="(product_treatments_attribute, index) in product_treatments_attributes" :key="product_treatments_attribute.id">
                          <div class="card">
                            <div class="card-body text-left">
                            <div class="form-group text-left" >
                              <label for="">Nombre del Tratamiento</label>
                                <select class="col-sm-8" v-model="product_treatments_attribute.treatment_id" v-if="!product_treatments_attribute.checkbox_treatment">
                                  <option v-for="treatment in treatments" 
                                  :key="treatment.id" 
                                  :value="treatment.id"
                                  class="form-control"
                                  v-model="treatment_id"
                                  >{{ treatment.name }}</option>
                                </select> 
                              <div>
                                <p>
                                  <input type="checkbox" 
                                          v-model="product_treatments_attribute.checkbox_treatment"
                                          @change="validate_product_treatments_attributes_id(index)">
                                  Nuevo Tratamiento  || index {{ index }}
                                  <input type="text" v-if="product_treatments_attribute.checkbox_treatment" v-model="product_treatments_attribute.treatment_new_name" >
                                  <button type="submit" class="btn btn-danger" @click="removeTreatment(index)"> - </button>
                                </p>
                               </div>  
                              <label for="">Costo del Tratamiento</label>
                              <input type="number" min="1" pattern="^[0-9]+" v-model.number="product_treatments_attribute.cost" required>
                            </div>
                            </div>
                          </div>
                          <br>
                        </div>
                      </div>
                  </div>

                  <div class="form-group row">
                      <div class="col-sm-10">
                          <button type="submit" class="btn btn-primary">Cambiar Fase</button>
                      </div>
                  </div>

              </form>  

              <div class="alert alert-primary" role="alert" v-if="alert_post_product_treatment_phase">
                  <br>
                  <p v-if="product_treatment_phase.length > 0">Correcto: {{ product_treatment_phase }}</p>
                  <br>
                  <p  v-if="error_product_treatment_phase.length > 0">Incorrecto: {{ error_product_treatment_phase }}</p>
              </div>

              <div>
                <p>
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

export default {
  components: { DatePicker },
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
      weight_phase: Number,
      count_treatment: 0,
      treatments: [],
      checkbox_treatment: false,
      product_treatments_attributes: [],
      treatment_id: null,
      treatment_new_name: null,
      treatment_cost: null,
      product_treatment_phase: [],
      error_product_treatment_phase: []
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
    getProducts: function() {
      this.$http.get('http://localhost:3000/products').then(response => {
        this.products = response.body;
      },response => {
        //error
      })
    },
    getTreatments: function() {
      this.$http.get('http://localhost:3000/treatments').then(response => {
        this.treatments = response.body;
      },response => {
        //error
      })
    },
    postQuantities: function() {
      this.$http.post('http://localhost:3000/quantities',{
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
      this.$http.post('http://localhost:3000/product_treatment_phases',{
        weight: Number(this.weight_phase),
        phase_id_previous: this.phase_id_previous,
        phase_id: this.phase_id,
        product_id: this.f_product_id,
        product_treatment_phase_id: null,
        product_treatments_attributes: this.product_treatments_attributes 
      }).then(response => {
        this.product_treatment_phase = response.body;
      },response => {
        this.error_product_treatment_phase = response;
      });
        this.weight_phase = ''
        this.phase_id_previous = ''
        this.phase_id = ''
        this.f_product_id = ''
        this.count_treatment = 0
        this.product_treatments_attributes = []
      var vmm = this;
      setTimeout(function(){ vmm.alert_post_product_treatment_phase = false }, 3000);
    },
    getPhases: function() {
      this.$http.get('http://localhost:3000/phases').then(response => {
        this.phases = response.body;
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
          checkbox_treatment: false
        } 
      );
    },
    validate_product_treatments_attributes_id: function(index){
      if(this.product_treatments_attributes[index].checkbox_treatment) {
        this.product_treatments_attributes[index].treatment_id = null;
      }
    },
    cambiarHoja: function() {
      this.$router.push({ name: 'Inventary'})
    }   

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
