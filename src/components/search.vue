<template>
<div class='container'>
  <header>
    <input type="text" v-model='want' placeholder='欣赏旅途的导航'>
    <button @click='find'>搜索</button>
  </header>
  <div class="show">
    <div class="singleSong" v-for='(item,index) in abstract' :key="index">
      <router-link :to= '{name:"detail", params:{music:item.songname , play: item.songid}}'>
      <div>
      <li>{{item.songname}}</li>
      <li>{{item.artistname}}</li>
      </div>
      </router-link>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      want:"",
      abstract:[],
      mistake:""
    }
  },
  methods:{
    find(){
      var instead = this;
      var findUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.search.catalogSug&query="+ this.want;
      this.$axios.get(findUrl)
      .then( res => {
        //console.log(res.data);
        if(res.data.error_code='22000'){
          this.abstract=res.data.song;
          console.log(res.data.song);
        }     
      })
      .catch(err => console.log(err))
      
    }
  }
}
</script>
<style lang="less" scoped>
header{
  padding:0.5rem;
  input{
    font-size:0.8rem;
    border:1px solid rgb(241, 75, 75);
    padding:0.2rem 0.5rem;
    border-radius:10px;
  }
}
.singleSong{
  background:red;
  margin:1rem;
  font-size:0.75rem;
}
</style>
