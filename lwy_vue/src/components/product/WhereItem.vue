<template>
  <div class="where">
     <div class="w1200 d-flex f">
        <div class="left d-flex">
            <div class="tc">{{whereTitle}}：</div>
            <ul :style="moreF?'height:56px;':''">
                <li v-for="(item,index) of data" :key="index">
                    <router-link @click.native="selectText(index)" :class="searchI==index?'textRed':''" class="changeRed" to="">{{item}}</router-link> 
                </li>
            </ul>
        </div>
        <div v-if="data.length>16" class="more" @click="moreF=!moreF">更多
            <i :class="moreF?'toggleBgImg':''"></i>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      // 点击的是哪个条件
           searchI:0,
         //搜索条件 点击更多 展开与收起
          moreF:false,  
    }
  },
  props:{"data":{type:Array},"whereTitle":{default:""}},
  methods:{
    selectText(index){
      this.searchI=index;
    }
  }
}
</script>

<style scoped>
  .f{
      padding:20px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
  }
  .f .left .tc{
      width:85px;
      height:28px;
      text-align: center;
      line-height: 28px;
  }
  .f .left ul{
      width:1020px;
      display:flex;
      flex-wrap: wrap;
      /* align-items: center; */
      height:28px;
      /* 展开56 */
      overflow: hidden;
      transition: .3s linear;
  }
  .f .left ul li{
      height:26px;
      padding:0 6px;
      margin:0 10px;
      text-align: center;
      line-height:26px;
  }
  .f .more{
      width:80px;
      height:28px;
      text-align: center;
      line-height:28px;
      cursor: pointer;
  }
  .f .more i{
      display: inline-block;
      width:12px;
      height:6px;
      /* 151 */
      background: url(../../../public/images/bgr.png) no-repeat -235px -165px;
      margin-top:-3px;
  }
  .f .more i.toggleBgImg{
      background-position:  -235px -151px;
  }
  /* 点击哪个条件 哪个条件变红 */
  .textRed{
      color:#c1413d;
  }
</style>
