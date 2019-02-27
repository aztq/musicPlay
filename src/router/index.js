import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import more from '@/components/more'
import detail from '@/components/detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'/',
      component:HelloWorld
    },
    {
      path: '/more',
      name: 'more',
      component: more
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    }
  ]
})
