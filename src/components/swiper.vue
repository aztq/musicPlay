<template>
    <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide><img src="../../static/1.jpg"></swiper-slide>
    <swiper-slide><img src="../../static/2.jpg"></swiper-slide>
    <swiper-slide><img src="../../static/3.jpg"></swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data(){
    return{
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay:true
      }
    }
  },
  components:{
    swiper,swiperSlide
  },
}
</script>

<style lang="less" scoped>
.swiper-slide{
  width:100%;
  img{
    width:100%;
    height:10rem !important;
  }
}
</style>
