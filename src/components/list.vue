<template>
  <div class='container'>
    <div class="single" v-for='(item,index) in recommend' :key="index">
      <router-link :to= '{name:"detail", params:{music:item.album_title , play: item.song_id}}'>
      <img :src="item.pic_big">
      <li>{{item.title}}</li>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      recommend:[]
    }
  },
  mounted(){
    var recommend=this.HOST + "/v1/restserver/ting?method=baidu.ting.song.getRecommandSongList&song_id="+ 10000*Math.random(0,1)+"&num=10"
    this.$axios.get(recommend)
    .then(res =>{
      console.log(res.data.result.list)
      this.recommend=res.data.result.list
    })
  }
}
</script>
<style lang="less" scoped>
.container{
  display:flex;
  flex-wrap: wrap;
  .single{
    flex:1;
  }
}
li{
  margin:0.5rem;
}
</style>
