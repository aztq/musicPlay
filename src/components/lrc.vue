<template>
  <div>
    <div class="lrcContainer">
      <div class="lrc" ref='lrc'>
        {{getAllKey}}
          <p v-show='(parseInt(currentTime) >= keyArr[index]) && (parseInt(currentTime) < keyArr[index+1])' class="lrc-p" v-for='(item , key ,index) in lrcData' :key='index'>
            {{item}}---time:{{parseInt(currentTime)}}
          </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      lrc:{},
      lrcData:{},
      keyArr:[]
    }
  },
  props:{
    songid:{
      type:[String,Number],
      default:""
    },
    currentTime: {
      type:[String,Number],
      default:0
    },
    durationTime: {
      type:[String,Number],
      default:0
    }
  },
  mounted(){
    var lrcUrl=this.HOST + '/v1/restserver/ting?method=baidu.ting.song.lry&songid='+this.songid;
    this.$axios.get(lrcUrl)
    .then( res => {
      this.lrc = res.data.lrcContent;

      //歌词数据格式处理
      var lyrics = res.data.lrcContent.split('\n')
      var lrcObj = {}
      for ( var i =0 ; i< lyrics.length ; i++){
        var lyric =decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr) continue ;
        var clause = lyric.replace(timeReg , '');
          for( var k =0 ,h=timeRegExpArr.length; k<h; k++){
            var t =timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1));
            var sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time =min*60+sec;
            lrcObj[time]=clause;
          }
        }
       this.lrcData =lrcObj;
       //console.log(this.lrcData)
      })
    .catch(err => console.log(err) )
  },
  computed:{
      getAllKey(){
        for(var i in this.lrcData){
          this.keyArr.push(i)
        }
      }
  }
}
</script>
<style lang="less" scoped>
.lrc{
  text-align:center;
}
</style>
