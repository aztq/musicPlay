<template>
  <div class="hello">
    <flexbox class='tab'>
      <flexbox-item v-for='(item , index) in tab' :key= index>
        <router-link :to=item.to><div class="flex-demo">{{item.title}}</div></router-link>
      </flexbox-item>
    </flexbox>
    <router-view></router-view>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'
export default {
  data(){
    return{
      tab:[
        {title:'首页', to:'/front'},
        {title:'榜单', to:'/list'},
        {title:'我的', to:'/my'}
      ]
    }
  },
  components:{
    Flexbox,FlexboxItem
  }
}
</script>

<style lang="less" scoped>
.hello{
  overflow:hidden;
  .tab{
    padding:0.5rem;
    font-size:0.7rem;
    background:rgb(238, 238, 240);
  }
}
a:hover{
  text-decoration: none;
  color:rgb(245, 157, 157);
}
</style>