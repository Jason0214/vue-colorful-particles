import Vue from 'vue'
import Router from 'vue-router'
import colorfulParticles from '@/components/colorful-particles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'colorful-particles',
      component: colorfulParticles
    }
  ]
})
