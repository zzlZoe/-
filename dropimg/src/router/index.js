import Vue from 'vue'
import Router from 'vue-router'
import DropImg from '@/components/DropImg'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DropImg',
      component: DropImg
    },
  ]
})
