<template>
    <div id="AddQuantities">

      <div class="container">
        <div class="row">
          <div class="col-3">
            <form v-on:submit.prevent="postQuantities" >
              <div class="form-group row">
              <label for="inputPassword3" class="col-sm-4 col-form-label ">Producto</label>
              <select class="col-sm-8 text-left form-control" v-model="product_id" required>
                  <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
              </select> 
              </div>  
              <div class="form-group row">
                  <label for="inputPassword3" class="col-sm-4 col-form-label text-left">Fecha</label>
                  <date-picker class="col-sm-8 " v-model="date" valueType="format"  required></date-picker>
              </div> 
              <div class="form-group row">
                  <label for="inputPassword3" 
                  class="col-sm-4 col-form-label text-left"> Cantidad </label>
                  <div class="col-sm-8">
                      <input  class="form-control"  min="0" pattern="^[0-9].+" @input="dotFilter()" v-model="weight" required>
                      <!-- <vue-numeric  class="form-control"  separator="." @input="dotFilter()" v-model="weight" required></vue-numeric> -->
                  </div>
              </div>       
              <div class="form-group row">
                  <label for="inputPassword3" class="col-sm-4 col-form-label text-left"> Costo Total</label>
                  <div class="col-sm-8">
                      <input  class="form-control" min="0" pattern="^[0-9].+"  @input="dotFilterCost()" v-model="cost" required>
                      <!-- <vue-numeric  class="form-control" currency="$" separator="." v-model="cost" required></vue-numeric> -->
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
            
            <!--
            <div>
              <h3>Parametros</h3>     
              <p>Date {{ date }}</p>
            </div>
            -->

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
  name: 'AddQuantities',
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
    this.currentDate();
  },
  beforeUpdate () {

  },
 
  methods: {
     dotFilter(){
      var value = String(this.weight.replace(/[.']/g,''));
      var finalValue = value.replace(/[.']/g,'');
      if(value.length >= 7){
          finalValue=value.substring(0,value.length-6)+"'"+value.substring(value.length-6,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        else if(value.length >= 4){
          finalValue=value.substring(0,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        this.weight = finalValue;
    },
    dotFilterCost(){
      var value = String(this.cost.replace(/[.']/g,''));
      var finalValue = value.replace(/[.']/g,'');
      if(value.length >= 7){
          finalValue=value.substring(0,value.length-6)+"'"+value.substring(value.length-6,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        else if(value.length >= 4){
          finalValue=value.substring(0,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        this.cost = finalValue;
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
        weight: Number(this.weight.replace(/[.']/g,'')),
        cost: Number(this.cost.replace(/[.']/g,'')),
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
      this.$http.post('product_treatment_phases',{
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
        this.alert_post_product_treatment_phase = true 
      var vmm = this;
      setTimeout(function(){ vmm.alert_post_product_treatment_phase = false }, 3000);
    },
    getPhases: function() {
      this.$http.get('phases').then(response => {
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
    format: function(input) {
        var num = input.value.replace(/\./g,"");
        if(!isNaN(num)){
        num = num.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        num = num.split("").reverse().join("").replace(/^[\.]/, "");
        input.value = num;
      }
      else{ alert("Solo se permiten numeros");
        input.value = input.value.replace(/[^\d\.]*/g,"");
      }
    }

  }
}

//  http://localhost:3000

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
