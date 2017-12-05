import Vue from 'vue'
import Router from 'vue-router'
import controller from '@/components/controller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'controller',
      component: controller
    }
  ]
})
