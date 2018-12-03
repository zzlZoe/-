import Vue from 'vue'
import Router from 'vue-router'
import DropImg from '@/components/DropImg'
import Directive from '@/components/directive'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DropImg',
      component: DropImg
    },
    {
      path: '/Directive',
      name: 'Directive',
      component: Directive
    },
  ]
})
