import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import front from '@/components/front'
import list from '@/components/list'
import search from '@/components/search'

import more from '@/components/more'
import detail from '@/components/detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'/',
      redirect:'/front',
      component:HelloWorld,
      children:[
        {
          path: '/front',
          name:'front',
          component:front
        },
        {
          path: '/list',
          name:'list',
          component:list
        },
        {
          path: '/search',
          name:'search',
          component:search
        },
      ]
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
