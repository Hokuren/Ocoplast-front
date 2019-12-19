<template>
    <div id="NewProduct">

      <div class="container">
        <div class="row">
          <div class="col-8">
              <form v-on:submit.prevent="postProduct" >

                <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label"> Producto Nuevo </label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="name_product" required>
                </div>
                </div>  
                <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label">Referencia de Producto</label>
                <select class="col-sm-8" v-model="product_id" required>
                    <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
                </select> 
                </div>  
                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">Crear Producto</button>
                    </div>
                </div>
              </form> 

              <div class="alert alert-primary" role="alert" v-if="arlert_create_product">
                <p>Notificacion: 
                  {{ post_product }}
                </p>
              </div>
       

              <div class="alert alert-primary" role="alert" v-if="alert_post_product_treatment_phase">
                  <br>
                  <p v-if="product_treatment_phase.length > 0">Correcto: {{ product_treatment_phase }}</p>
                  <br>
                  <p  v-if="error_product_treatment_phase.length > 0">Incorrecto: {{ error_product_treatment_phase }}</p>
              </div>

              <!-- <div>
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
              </div> -->

          </div>
        </div>
      </div>

  </div> <!-- closed PeticionAjax -->
</template> 

<script>


export default {
  name: 'NewProduct',
  data () {
    return {
      products: [],
      name_product:'',
      product_id: null,
      arlert_create_product: false,
      post_product: [] 
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
    postProduct: function() {
      this.$http.post('http://localhost:3000/products',{
        name: this.name_product,
        product_id: this.product_id
      }).then(response => {
        this.post_product = response.body;
      },response => {
        //error
      });
      this.product_id = '';
      this.cost = '';
      this.weight = '';
      this.date = '';
      this.arlert_create_product = true;
      var vm = this;
      setTimeout(function(){ vm.arlert_create_product = false }, 3000);
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
