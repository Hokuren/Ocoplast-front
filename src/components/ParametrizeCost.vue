<template>
  <div id="ParametrizeCost">
    <h3>Parametrizar Costos</h3>
    <div id="list-example" class="list-group col-sm-4">
      <a class="list-group-item list-group-item-action" href="#list-item-1">Costos Por Fase</a>
      <a class="list-group-item list-group-item-action" href="#list-item-2">Porcentaje Por Fase</a>
    </div>
    <div data-spy="scroll" data-target="#list-example" data-offset="0" class="scrollspy-example">
      <h4 id="list-item-1">              
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-4 col-form-label text-left">Referencia de Producto</label>
          <select class="col-sm-4 input_width form-control"  v-model="period_id" @change="getPeriodCosts(period_id)">
              <option v-for="period in periods" :key="period.id" :value="period.id">{{ period.period }}</option>
          </select> 
        </div>  
      </h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ipsam excepturi obcaecati tempora labore laudantium et saepe non, optio est, ea voluptatem, dignissimos consequatur aspernatur reiciendis! Nostrum aut impedit a.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis neque culpa odit animi architecto quia excepturi esse explicabo aut corporis, odio debitis quasi similique, alias inventore? Reiciendis expedita ducimus laudantium.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit expedita adipisci nostrum, saepe beatae dolore suscipit est maxime officiis tempore. Recusandae voluptatum aliquid quasi consectetur aut dignissimos esse numquam voluptatem?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque sapiente, fugit labore consectetur mollitia totam. Et quidem a, saepe molestias voluptatum, veritatis, eius quaerat facere ea officiis fuga sapiente repellendus.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro quam eos deserunt veritatis non quos corporis tempore excepturi perferendis necessitatibus odio cumque molestiae laboriosam, consectetur minima modi, soluta facilis reiciendis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur libero fuga impedit. Cum sit optio, corporis eos pariatur sequi assumenda? Exercitationem ipsum iure consequuntur sed doloribus quos porro delectus necessitatibus.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil eveniet assumenda, similique cumque eum quaerat dolorum eius nostrum quos ipsam architecto quam? Tempora libero eos porro eligendi sit commodi ipsa!  
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni necessitatibus voluptas quis quo optio officiis ab veniam eos culpa laborum sint aspernatur non rem, porro provident modi corporis voluptates ipsa.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae itaque illum recusandae repellat eum accusantium amet, laboriosam tempora. Sunt suscipit voluptas aliquam? Atque, quod possimus. Dolor exercitationem maiores quae animi.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ipsam excepturi obcaecati tempora labore laudantium et saepe non, optio est, ea voluptatem, dignissimos consequatur aspernatur reiciendis! Nostrum aut impedit a.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis neque culpa odit animi architecto quia excepturi esse explicabo aut corporis, odio debitis quasi similique, alias inventore? Reiciendis expedita ducimus laudantium.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit expedita adipisci nostrum, saepe beatae dolore suscipit est maxime officiis tempore. Recusandae voluptatum aliquid quasi consectetur aut dignissimos esse numquam voluptatem?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque sapiente, fugit labore consectetur mollitia totam. Et quidem a, saepe molestias voluptatum, veritatis, eius quaerat facere ea officiis fuga sapiente repellendus.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro quam eos deserunt veritatis non quos corporis tempore excepturi perferendis necessitatibus odio cumque molestiae laboriosam, consectetur minima modi, soluta facilis reiciendis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur libero fuga impedit. Cum sit optio, corporis eos pariatur sequi assumenda? Exercitationem ipsum iure consequuntur sed doloribus quos porro delectus necessitatibus.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil eveniet assumenda, similique cumque eum quaerat dolorum eius nostrum quos ipsam architecto quam? Tempora libero eos porro eligendi sit commodi ipsa!  
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni necessitatibus voluptas quis quo optio officiis ab veniam eos culpa laborum sint aspernatur non rem, porro provident modi corporis voluptates ipsa.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae itaque illum recusandae repellat eum accusantium amet, laboriosam tempora. Sunt suscipit voluptas aliquam? Atque, quod possimus. Dolor exercitationem maiores quae animi.
      </p>
      <h4 id="list-item-2">Item 2</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ipsam excepturi obcaecati tempora labore laudantium et saepe non, optio est, ea voluptatem, dignissimos consequatur aspernatur reiciendis! Nostrum aut impedit a.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis neque culpa odit animi architecto quia excepturi esse explicabo aut corporis, odio debitis quasi similique, alias inventore? Reiciendis expedita ducimus laudantium.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit expedita adipisci nostrum, saepe beatae dolore suscipit est maxime officiis tempore. Recusandae voluptatum aliquid quasi consectetur aut dignissimos esse numquam voluptatem?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque sapiente, fugit labore consectetur mollitia totam. Et quidem a, saepe molestias voluptatum, veritatis, eius quaerat facere ea officiis fuga sapiente repellendus.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro quam eos deserunt veritatis non quos corporis tempore excepturi perferendis necessitatibus odio cumque molestiae laboriosam, consectetur minima modi, soluta facilis reiciendis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur libero fuga impedit. Cum sit optio, corporis eos pariatur sequi assumenda? Exercitationem ipsum iure consequuntur sed doloribus quos porro delectus necessitatibus.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil eveniet assumenda, similique cumque eum quaerat dolorum eius nostrum quos ipsam architecto quam? Tempora libero eos porro eligendi sit commodi ipsa!  
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni necessitatibus voluptas quis quo optio officiis ab veniam eos culpa laborum sint aspernatur non rem, porro provident modi corporis voluptates ipsa.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae itaque illum recusandae repellat eum accusantium amet, laboriosam tempora. Sunt suscipit voluptas aliquam? Atque, quod possimus. Dolor exercitationem maiores quae animi.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ipsam excepturi obcaecati tempora labore laudantium et saepe non, optio est, ea voluptatem, dignissimos consequatur aspernatur reiciendis! Nostrum aut impedit a.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis neque culpa odit animi architecto quia excepturi esse explicabo aut corporis, odio debitis quasi similique, alias inventore? Reiciendis expedita ducimus laudantium.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit expedita adipisci nostrum, saepe beatae dolore suscipit est maxime officiis tempore. Recusandae voluptatum aliquid quasi consectetur aut dignissimos esse numquam voluptatem?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque sapiente, fugit labore consectetur mollitia totam. Et quidem a, saepe molestias voluptatum, veritatis, eius quaerat facere ea officiis fuga sapiente repellendus.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro quam eos deserunt veritatis non quos corporis tempore excepturi perferendis necessitatibus odio cumque molestiae laboriosam, consectetur minima modi, soluta facilis reiciendis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur libero fuga impedit. Cum sit optio, corporis eos pariatur sequi assumenda? Exercitationem ipsum iure consequuntur sed doloribus quos porro delectus necessitatibus.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil eveniet assumenda, similique cumque eum quaerat dolorum eius nostrum quos ipsam architecto quam? Tempora libero eos porro eligendi sit commodi ipsa!  
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni necessitatibus voluptas quis quo optio officiis ab veniam eos culpa laborum sint aspernatur non rem, porro provident modi corporis voluptates ipsa.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae itaque illum recusandae repellat eum accusantium amet, laboriosam tempora. Sunt suscipit voluptas aliquam? Atque, quod possimus. Dolor exercitationem maiores quae animi.
      </p>
    </div>

    <div>
      <h4>Parametros</h4>
      <p>Perids: {{ periods }}</p>
      <p>Costs_period: {{ costs_period }}</p> 
    </div>

  </div>
</template>

<script>
export default {
  name: 'ParametrizeCost',
  data() {
    return {
      periods: [],
      period_id: null,
      costs_period: ''
    }
  },
  mounted() {
    this.getPeriod();
  },
  methods: {
    getPeriod: function(){
      this.$http.get('periods').then(response=> {
        this.periods = response.body;
      },response => {

      });
    },
    getPeriodCosts: function(period_id){
      console.log('getPeriodCosts');
      this.$http.get('/period/costs/'+ period_id).then(response=> {
        this.costs_period = response.body
      },response => {

      });
    }

  }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
