<template>
<div class='container'>
  <span>{{this.$route.params.title}}</span>
    
    <VuePullRefresh :on-refresh="onRefresh">

  <div id="list">
   <div id='single' v-for='(item,index) in list' :key="index" >
   <router-link :to= '{name:"detail", params:{music:item.album_title , play: item.song_id}}'>
   <img :src="item.pic_big" alt="">
   <li>{{item.album_title}}</li>
   </router-link>
   </div>
  </div>
  </VuePullRefresh>
</div>
</template>
<script>
import VuePullRefresh from 'vue-pull-refresh';
import { setTimeout } from 'timers';

export default {
  data(){
    return{
      list:[],
      offset:12
    }
  },
  components: {
    VuePullRefresh
  },
  methods:{
    onRefresh(){
     const that =this;
     const moreurl = this.HOST + '/v1/restserver/ting?method=baidu.ting.billboard.billList&type='+ this.$route.params.musictype +'&size=12&offset='+this.offset;
      return new Promise(function (resolve, reject) {  
        setTimeout(() => {
          that.$axios.get(moreurl)
          .then(res => 
          {
           //console.log(res.data.song_list);
           that.list=that.list.concat(res.data.song_list).reverse();
           console.log(res.data.billboard.billboard_songnum);
           (that.offset>=res.data.billboard.billboard_songnum - 12) ? alert('没有数据了') :that.offset+=12;
           console.log(that.offset)
           resolve()
           })
        })
      
        
      });
    }
  },
  mounted(){
    var url = this.HOST + '/v1/restserver/ting?method=baidu.ting.billboard.billList&type='+ this.$route.params.musictype +'&size=12&offset=0'
    this.$axios.get(url)
     .then(res => 
     {
      //console.log(res.data)
      this.list=res.data.song_list
      })
     .catch(err => console.log(err))
  }
}
</script>
<style lang="less" scoped>
span{
  font-size:0.9rem;
}
#list{
  padding:0.5rem 0;
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
