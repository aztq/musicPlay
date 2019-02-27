<template>
  <div class="he">
    {{this.$route.params.music}}{{this.$route.params.play}}
    <audio :src=this.source controls autoplay loop></audio>
    <audio src="../../static/1.mp3" controls></audio>
  </div>
</template>
<script>
export default {
  data(){
    return{
      source:''
    }
  },
  mounted(){
    var playUrl=this.HOST +'/v1/restserver/ting?method=baidu.ting.song.play&songid='+this.$route.params.play
    this.$axios.get(playUrl)
    .then(res => 
    {
      console.log(res)
      this.source=res.data.bitrate.file_link
      console.log(this.source)
    })
  }
}
</script>
<style>
audio{
  height:5rem; 
  width:100%;
}
</style>
