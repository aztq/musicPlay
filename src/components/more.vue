<template>
<div class='container'>
  <span>{{this.$route.params.title}}</span>
  <div id='list'>
    <div id='single' v-for='(item,index) in list' :key="index" >
     <img :src="item.pic_big" alt="">
     <li>{{item.album_title}}</li>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      list:[]
    }
  },
  mounted(){
    var url = this.HOST + '/v1/restserver/ting?method=baidu.ting.billboard.billList&type='+ this.$route.params.musictype +'&size=12&offset=4'
    this.$axios.get(url)
     .then(res => 
     {
      console.log(res.data.song_list[0])
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
