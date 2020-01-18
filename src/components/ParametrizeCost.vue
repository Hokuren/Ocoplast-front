<template>
  <div id="ParametrizeCost">

    <br>
    <h3>Parametrizar Costos</h3>
    <br>

    <div class="container"> 
      <div class="row">

      

        <div class="col-sm-3">
          <div id="list-example" class="list-group">
            <a class="list-group-item list-group-item-action" href="#list-item-1" @click="changeFlagCostDForPhase">Costos Fijos</a>
            <a class="list-group-item list-group-item-action" href="#list-item-2" @click="changeFlagPorcentageDForPhase">Costos Fijos Por Fase</a>
          </div>
        </div>
        
        <br>

        <div class="col-sm-9">

          <div data-spy="scroll" data-target="#list-example" data-offset="0" class="scrollspy-example">       
              <div class="form-group row">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Periodo</label>
                  </div>
                  <select class="custom-select" id="inputGroupSelect01"  v-model="period_id" @change="getPeriodCosts(period_id)" required>
                    <option v-for="period in periods" :key="period.id" :value="period.id">{{ period.period }}</option>
                  </select>
                  <!-- <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" data-toggle="modal" data-target="#newPeriod">Nuevo Periodo</button>
                  </div> -->
                </div>
                
                <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if=" (period_id === null || period_id === '') && count_click === true ">
                  No seleccionaste un <strong>Periodo!</strong>
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <!-- <span aria-hidden="true">&times;</span> -->
                  </button>
                </div>

              </div>  
            
            <br>
            <div v-if="flag_cost_for_phase === true && period_id > 0">
              <h4 id="list-item-1">Costos Por Fase</h4>
              <p>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Costo</th>
                    <th scope="col">Valor</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="cost_perid in costs_period" :key="cost_perid.id">
                    <th scope="row">{{ cost_perid.id }}</th>
                    <td>{{ cost_perid.name }}</td>
                    <td>{{ cost_perid.cost }}</td>
                  </tr>
                </tbody>
              </table>
              </p>
            </div>

            <div v-if="flag_porcentage_for_phase === true && period_id > 0">
              <h4 id="list-item-2">Porcentaje por Fase</h4>
              <p>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Fases</th>
                    <th scope="col">Costos</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="phase in phases" :key="phase.id">
                    <th scope="row">{{ phase.id }}</th>
                    <td><a role="button" class="btn btn-outline-primary" @click="postPeriodPhase(phase.id)" >{{ phase.name }}</a></td>
                    <td>

                      <table class="table" v-if="phase_id === phase.id && costs_phase.length > 0">
                        <thead class="thead-light">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Costo</th>
                            <th scope="col">Porcentaje</th>
                            <th scope="col">Costo * Porcentaje</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cost_phase in costs_phase" :key="cost_phase.id"  >
                            <th scope="row">{{ cost_phase.id }}</th>
                            <td>{{ cost_phase.cost_name }}</td>
                            <td>{{ cost_phase.cost }}</td>
                            <td>{{ cost_phase.porcentage }}</td>
                            <td>{{ ( (cost_phase.cost * cost_phase.porcentage) / 100 ) }}</td>
                          </tr>
                        </tbody>
                      </table>

                    </td>  
                  </tr>
                </tbody>
              </table>
              </p>
            </div>

          </div>
        </div>


        <div class="modal fade" id="newPeriod" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Nuevo Periodo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group text-left">
                    <label for="recipient-name" class="col-form-label">Periodo:</label>
                    <input type="text" class="form-control col-sm-8" id="recipient-name" v-model="period">
                  </div>
                  <div class="form-group text-left">
                      <label for="inputPassword3" class="col-form-label">Fecha Inicial</label>
                      <date-picker  class="col-sm-12 ui-timepicker-container" 
                                    v-model="start_date" 
                                    valueType="format"  
                                    required
                                    >
                      </date-picker>
                  </div> 
                  <div class="form-group text-left">
                      <label for="inputPassword3" class="col-form-label">Fecha Final :</label>
                      <date-picker class="col-sm-12 ui-timepicker-container" v-model="end_date" valueType="format"  required></date-picker>
                  </div> 
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="postPeriod">Crear Periodo</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>

      </div> <!-- Closed row --->
    </div> <!-- Closed container --> 

    <div>
      <h4>Parametros</h4>
      <p>period: {{ period }} </p>
      <p>start_date: {{ start_date }}</p>
      <p>end_date: {{ end_date }}</p>  
      <p>Perids: {{ periods }}</p>
      <p>Costs_period: {{ costs_period }}</p>
      <p>Period_id: {{ period_id }}</p>
      <p>Phase_id: {{ phase_id }}</p>
      <p>Cost Phase: {{ costs_phase }}</p>
    </div>

  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: {
    DatePicker,
  },
  name: 'ParametrizeCost',
  data() {
    return {
      periods: [],
      phases: [],
      costs_phase: [],
      period_id: null,
      costs_period: '',
      period_id: '',
      cost_id: '',
      phase_id: '',
      flag_cost_for_phase: false, 
      flag_porcentage_for_phase: false, 
      count_click: false,
      period: '',
      start_date: '',
      end_date: '',     
      open_date: new Date()
    }
  },
  mounted() {
    this.getPeriod();
    this.getPhases();
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
      this.$http.get('costs_period/'+ period_id).then(response=> {
        this.costs_period = response.body
      },response => {

      });
    },
    getPhases: function() {
      this.$http.get('phases').then(response => {
        this.phases = response.body;
        this.phases.splice( this.phases.indexOf('Pool'), 1 );
      },response => {
        //error
      })
    },
    postPeriodPhase: function(phase_id) {
      console.log('postPeriodPhase()');
      console.log('phase_id:  ', phase_id);
      this.phase_id = phase_id
      console.log('this.phase_id:  ', this.phase_id)
      this.$http.post('costs_phase',{
        period_id: this.period_id,
        phase_id: this.phase_id
      }).then(response => {
        this.costs_phase = response.body
      },response => {
        //errror
      });
    },
    changeFlagCostDForPhase: function(){
        this.count_click = true 
        if (this.flag_cost_for_phase === true) {
          this.flag_cost_for_phase = false
        } else {
          this.flag_porcentage_for_phase = false
          this.flag_cost_for_phase = true   
        }
    },
    changeFlagPorcentageDForPhase: function(){
      this.count_click = true
      if (this.flag_porcentage_for_phase === true) {
        this.flag_porcentage_for_phase = false
      } else {
        this.flag_cost_for_phase = false
        this.flag_porcentage_for_phase = true
      }
    },
    postPeriod: function(){
      this.start_date
      var mes = thisstart_date.substring(5,7)
      var anio = date.getFullYear();
      console.log('date   :', date)
      console.log('mes   :', mes) 
      console.log('anio   :', anio)
      // var año = this.start_date.getFullYear();
      // console.log('mes ', mes)
      // console.log('año ', año)
      // this.$http.post('periods',{

      // }).then(response => {

      // },response => {

      // });
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
