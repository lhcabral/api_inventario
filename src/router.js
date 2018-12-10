import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Inventarios from './views/Inventarios.vue'
import InventarioForm from './views/InventarioForm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: About
    },
    {
      path: '/inventarios',
      name: 'inventarios',
      component: Inventarios
    },
    {
      path: '/inventario/novo',
      name: 'inventario-novo',
      component: InventarioForm
    },
    {
      path: '/inventario/:id/alterar',
      name: 'inventario-alterar',
      component: InventarioForm
    }
  ]
})
