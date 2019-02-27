<template>
  <div class="he">
    <div class="top">
      <span>{{this.$route.params.music}}</span>
    </div>
    <img :src=this.src alt="">
    <audio ref='player' :src=this.source controls loop></audio>
    <LRC :songid="this.$route.params.play" :currentTime='currentTime' :durationTime='durationTime'/>
  </div>
</template>
<script>
import LRC from './lrc'
export default {
  data(){
    return{
      source:'',
      src:'',
      lrclink:'',
      currentTime:0,
      durationTime:0
    }
  },
  components:{
    LRC
  },
  //销毁时的生命周期函数
  beforeDestroy(){
    this.removeEventListeners();
  },
  mounted(){
    var playUrl=this.HOST +'/v1/restserver/ting?method=baidu.ting.song.play&songid='+this.$route.params.play
    this.$axios.get(playUrl)
    .then(res => 
    {
      //console.log(res)            //单支音乐详情
      this.lrclink=res.data.songinfo.lrclink //单支歌词
      this.source=res.data.bitrate.file_link
      this.src=res.data.songinfo.pic_big
      //console.log(this.source)  //单支音频地址
    })

    this.addEventListeners()
  },
  methods:{
    addEventListeners(){
      //timeupdate监听播放时间
      this.$refs.player.addEventListener('timeupdate',this._currentTime)
      //canplay监听播放的整体时间
      this.$refs.player.addEventListener('canplay',this._durationTime)
    },
    removeEventListeners(){
      
      this.$refs.player.removeEventListener('timeupdate',this._currentTime)
      this.$refs.player.removeEventListener('canplay',this._durationTime)
    },
    //audio标签提供了解当前播放时长的方式
    _currentTime(){
      //console.log(this.$refs.player.currentTime);
      this.currentTime=this.$refs.player.currentTime;
    },
    //audio标签提供了解总共播放时长的方式
    _durationTime(){
      //console.log(11);
      this.durationTime=this.$refs.player.duration;
    }
  }
}
</script>
<style lang="less" scoped>
audio{
  width:100%;
}
.top{
  font-size:0.8rem;
  text-align:center;
  margin-top:0.5rem;
}
img{
  margin:0 auto;
  display:block;
  margin-top:0.5rem;
  margin-bottom:0.5rem;
}
</style>