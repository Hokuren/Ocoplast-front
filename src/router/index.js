import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Phases from '@/components/Phases'
import PeticionAjax from '@/components/PeticionAjax'
import Inventary from '@/components/Inventary'
import ProductQuantities from '@/components/ProductQuantities'
import PullQuantities from '@/components/PullQuantities'
import Classification from '@/components/Classification'
import NewProduct from '@/components/NewProduct'
import AddQuantities from '@/components/AddQuantities'

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
    {
      path: '/PullQuantities',
      name: 'PullQuantities',
      component: PullQuantities
    },
    {
      path: '/Classification',
      name: 'Classification',
      component: Classification
    },
    {
      path: '/NewProduct',
      name: 'NewProduct',
      component: NewProduct
    },
    {
      path: '/AddQuantities',
      name: 'AddQuantities',
      component: AddQuantities
    }
  ]
})
