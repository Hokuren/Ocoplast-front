<template>
    <div id="ProductQuantities">

      <div class="container">
        <div class="row">
          <div class="col-4">
              <form v-on:submit.prevent="postProductQuantities" >
                <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label">Producto</label>
                <select class="form-control col-sm-8" v-model="product_id" required>
                    <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
                </select> 
                </div>  
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-4 col-form-label">Fecha Inicial</label>
                    <date-picker class="col-sm-8" v-model="initial_date" valueType="format" required></date-picker>
                </div> 
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-4 col-form-label">Fecha Final</label>
                    <date-picker class="col-sm-8" v-model="last_date" valueType="format" required></date-picker>
                </div> 
                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">Buscar</button>
                    </div>
                </div>
              </form>
          </div> 


          <div class="col-4" v-if="card_invetary_product">

            <div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">{{ product_quantities.name }}</h5>
                <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Product_id: {{ product_quantities.product_id }}</li>
                <li class="list-group-item">Peso en Kg: {{ product_quantities.weight }}</li>
                <li class="list-group-item">Costo Total: {{ product_quantities.cost }}</li>
                <li class="list-group-item">
                  <button type="submit" class="btn btn-primary" @click="postProductQuantitiesDetail" formmethod="post">Detalle</button>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-4" >
            <table class="table">
            <!-- <thead class="thead-dark">
                <tr>
                  <th scope="col" class="text-left">Producto</th>
                  <th scope="col" v-for="(phase, index) in phases" :key="index" class="text-left">{{ phase.name }}</th>
                </tr>
              </thead> -->
              <tbody>
                <tr scope="row" v-for="(product_detail, index) in product_quantities_detail" :key="index">
                  <th class="text-left">
                    Costo: {{ product_detail.cost }}  (Kg) <br>
                    Peso Inicial: {{ product_detail.weight_initial }} (Kg) <br>
                    Peso: {{ product_detail.weight }} (Kg) <br> 
                    Fecha: {{ product_detail.date }}     
                  </th>
                </tr>
              </tbody>
            </table>
          </div>


      </div>   <!-- closed row -->
    </div> <!-- closed contairner -->


    <!--
    <div>
      <p>product_id: {{ product_id }}</p>
	    <p>initial_date: {{ initial_date }}</p>
      <p>last_date: {{ last_date }}</p>
      <p>product_quantities: {{ product_quantities }}</p>
      <div>
        Detail : {{ product_quantities_detail }}
      </div>
    </div>
    -->

  

  </div> 
</template> 


<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: { DatePicker },
  name: 'ProductQuantities',
  data () {
    return {
      product_id: '',
	    initial_date: '',
      last_date: '',
      products: [],
      product_quantities:[],
      product_quantities_detail: [],
      card_invetary_product: false
    }
  },
  mounted () {
    this.getProducts();
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
    postProductQuantities: function(){
      console.log('ingreso al post');
      this.$http.post('http://localhost:3000/product_quantities',{
        id: Number(this.product_id),
        initial_date: this.initial_date,
        last_date: this.last_date,
      }).then(response => {
        this.product_quantities = response.body
      },response => {
        //error
      });
      this.card_invetary_product =  true;
      var vm = this;

    },
    postProductQuantitiesDetail: function(){
      console.log('ingreso al post Detail');
      console.log(Number(this.product_id), this.initial_date,  this.last_date)
      this.$http.post('http://localhost:3000/product_quantities/detail',{
        id: Number(this.product_id),
        initial_date: this.initial_date,
        last_date: this.last_date,
      }).then(response => {
        this.product_quantities_detail = response.body
      },response => {
        //error
      });
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
