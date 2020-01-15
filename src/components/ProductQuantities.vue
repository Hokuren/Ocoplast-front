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
              <tbody>
                <tr scope="row" v-for="(product_detail, index) in product_quantities_detail" :key="index">
                  <th class="text-left">
                    Peso: {{ product_detail.weight }} (Kg) <br> 
                    Peso Inicial: {{ product_detail.weight_initial }} (Kg) <br>
                    Costo: {{ product_detail.cost }}  (Kg) <br>
                    Fecha: {{ product_detail.date }}
                    <!-- <button class="btn btn-primary">Editar</button>     -->
                    <button type="button" 
                            class="btn btn-primary"
                            data-toggle="modal" 
                            data-target="#editQuantityModal" 
                            @click="editQuantity(product_detail.id,product_detail.weight,product_detail.cost,product_detail.date)"
                            >Editar
                    </button> 
                  </th>
                </tr>
              </tbody>
            </table>

          </div>

          <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Open modal for @mdo</button>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">Open modal for @fat</button>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Open modal for @getbootstrap</button> -->

          <div class="modal fade" id="editQuantityModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Editar</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group text-left">
                      <label for="recipient-name" class="col-form-label">Peso:</label>
                      <input type="text" class="form-control" id="recipient-name" v-model="weight_quantity" @input="dotFilterWeightQuantity()" >
                    </div>
                    <div class="form-group text-left">
                      <label for="message-text" class="col-form-label">Costo:</label>
                      <input class="form-control" id="message-text" v-model="cost_quantity" @input="dotFilterCostQuantity()">
                    </div>
                     <!-- <div class="form-group text-left">
                      <label for="message-text" class="col-form-label">Fecha:</label>
                      <input class="form-control" id="message-text" v-model="date_quantity">
                    </div> -->
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" @click="putEditQuantity(id_quantity)" >Editar</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
              </div>
            </div>
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
      card_invetary_product: false,
      weight_quantity: null,
      cost_quantity: null,
      date_quantity: '',
      id_quantity: null
    }
  },
  mounted () {
    this.getProducts();
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
    postProductQuantities: function(){
      this.$http.post('product_quantities',{
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
      this.$http.post('product_quantities/detail',{
        id: Number(this.product_id),
        initial_date: this.initial_date,
        last_date: this.last_date,
      }).then(response => {
        this.product_quantities_detail = response.body
      },response => {
        //error
      });
    },
    editQuantity: function(id_quantity,weight, cost, date){
      this.id_quantity = Number(id_quantity)
      this.weight_quantity = Number(weight)
      this.cost_quantity = Number(cost)
      this.date_quantity = date
      this.dotFilterWeightQuantity();
      this.dotFilterCostQuantity();
    },
    dotFilterWeightQuantity: function(){
      var value = String(this.weight_quantity.replace(/[.']/g,''));
      var finalValue = value.replace(/[.']/g,'');
      if(value.length >= 7){
          finalValue=value.substring(0,value.length-6)+"'"+value.substring(value.length-6,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        else if(value.length >= 4){
          finalValue=value.substring(0,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        this.weight_quantity = finalValue;
    },
    dotFilterCostQuantity: function(){
      var value = String(this.cost_quantity.replace(/[.']/g,''));
      var finalValue = value.replace(/[.']/g,'');
      if(value.length >= 7){
          finalValue=value.substring(0,value.length-6)+"'"+value.substring(value.length-6,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        else if(value.length >= 4){
          finalValue=value.substring(0,value.length-3)+"."+value.substring(value.length-3,value.length);
        }
        this.cost_quantity = finalValue;
    },
    putEditQuantity: function(id){
      var vm = this;
      this.$http.put('quantities/'+id,{
        weight: Number(this.weight_quantity.replace(/[.']/g,'')),
        cost: Number(this.cost_quantity.replace(/[.']/g,'')),
      }).then(response => {
        $('#editQuantityModal').modal('hide');
        vm.postProductQuantitiesDetail();
      },response => {
        //error
      }); 
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
