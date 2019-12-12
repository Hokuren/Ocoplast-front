<template>
  <div id="PeticionAjax">
    <button @click="getProducts">Productos</button>
    <div v-for="product in products" :key="product.id">
      {{ product }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PeticionAjax',
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts: function() {
      this.$http.get('http://localhost:3000/products').then(response => {
        this.products = response.body;
      },response => {
        //error
      })
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
