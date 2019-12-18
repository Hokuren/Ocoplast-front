import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Phases from '@/components/Phases'
import PeticionAjax from '@/components/PeticionAjax'
import Inventary from '@/components/Inventary'
import ProductQuantities from '@/components/ProductQuantities'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PeticionAjax',
      component: PeticionAjax
    },
    {
      path: '/Inventary',
      name: 'Inventary',
      component: Inventary
    },
    {
      path: '/ProductQuantities',
      name: 'ProductQuantities',
      component: ProductQuantities
    },
  ]
})
