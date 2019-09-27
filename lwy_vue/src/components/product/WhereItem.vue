<template>
  <div class="where">
     <div class="w1200 d-flex f">
        <div class="left d-flex">
            <div class="tc">场合：</div>
            <ul :style="moreF?'height:56px;':''">
                <li v-for="(item,index) of data" :key="index">
                    <router-link @click.native="selectText(index)" :class="searchI==index?'textRed':''" class="changeRed" :to="/Products/+item">{{item}}</router-link> 
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
          //搜索条件f1的数据
          data:[['全部','生日','结婚','订婚','表白','纪念日','本命年','乔迁',
          '晋升','分别','毕业','答谢','祝贺','致歉','约会','见面','会议','拜访','年会','福利'],
          ['全部','男朋友','女朋友','男生','女生','老公','老婆','兄弟','姐妹','闺蜜','父亲',
           '母亲','男士','女士','老师','长辈','孩子','同事','客户','领导','学生','外国人','自己'],
          ['全部','创意','定制','星座','音乐','浪漫','吃货','爱车','烟民','办公','养生','潮人','运动','家居','酒茶','实用'],
          ['全部','100以下','100-200','200-300','300-500','500以上']],
    }
  },
  props:[data],
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
