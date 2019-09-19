<template>
      <!-- swiper -->
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(item,index) of list" :key="index">
            <router-link :to="`/Details/${item.pro_id}`" class="carousle_img" :style="`background:url(${img_url+item.img}) no-repeat center center`">
            </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
</template>

<script>
  export default {
  	data() {
  	  return {
    		swiperOption: {
    		    pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                paginationClickable: true,
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false
            },
            img_url:"http://127.0.0.1:5050/",
            list:[],
            
  	  }
    },
      created(){
          (async ()=>{
              var res=await this.axios.get('index/carousel');
              console.log(res);
              this.list=res.data.msg;
          })();
      }
  }
</script>
<style>
  .swiper{
      height:100%;
  }
   .carousle_img{
        display:block;
        width:100%;
        height:100%;
    }
    /* 改变指示器的样式 */
    .swiper-pagination-bullet{
        background-color:#f5f5f5 !important;
    }
    .swiper-pagination-bullet-active{
        border:3px solid red !important;
    }
</style>
