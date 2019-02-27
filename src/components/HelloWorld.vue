<template>
  <div class="hello">
    <flexbox class='tab'>
      <flexbox-item v-for='(item,index) in tab' :key="index"><div class="flex-demo">{{item}}</div></flexbox-item>
    </flexbox>
    <div class="more">
      <li class='left'>热歌</li>
      <router-link :to="{name:'more' , params:{title:'热歌' , musictype : 1}}"><li class='right'>更多</li></router-link>
    </div>
    <div id="list">
    <div id='single' v-for='(item,index) in list' :key="index" >
     <router-link :to= '{name:"detail", params:{music:item.album_title , play: item.song_id}}'>
     <img :src="item.pic_big" alt="">
     <li>{{item.album_title}}</li>
     </router-link>
    </div>
    </div>

    <div class="more">
      <li class='left'>新歌</li>
      <router-link :to="{name:'more' , params:{title:'新歌' , musictype : 2}}"><li class='right'>更多</li></router-link>
    </div>
    <div id="list">
     <div id='single' v-for='(item,index) in newList' :key="index" >
     <router-link :to= '{name:"detail", params:{music:item.album_title , play: item.song_id}}'>
     <img :src="item.pic_big" alt="">
     <li>{{item.album_title}}</li>
     </router-link>
     </div>
    </div>
    <Swiper />
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'
import Swiper from './swiper'
export default {
  data(){
    return{
      tab:['首页','榜单','我的'],
      list:[],
      newList:[]
    }
  },
  components:{
    Flexbox,FlexboxItem,
    Swiper
  },
  mounted(){
    var hoturl = this.HOST + '/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=6&offset=0'
    var newurl = this.HOST + '/v1/restserver/ting?method=baidu.ting.billboard.billList&type=2&size=6&offset=0'
    this.$axios.get(hoturl)
     .then(res => 
     {
      console.log(res.data.song_list[0])
      this.list=res.data.song_list
      })
     .catch(err => console.log(err))
     this.$axios.get(newurl)
     .then(res => 
     {
      console.log(res.data.song_list[0])
      this.newList=res.data.song_list
      })
     .catch(err => console.log(err))
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
.more{
  height:1rem;
  padding:0.3rem;
  .left{
    font-size:0.8rem;
    float:left;
  }
  .right{
    font-size:0.7rem;
    float:right;
    color:skyblue;
  }
}
#list{
  display:flex;
  flex-wrap:wrap;
  text-align:center;
 #single{
  flex:1;
  img{
  width:100px;
  } 
  li{
  font-size:0.7rem;
  }
 }
}
</style>