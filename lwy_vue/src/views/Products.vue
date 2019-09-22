<template>
    <div>
        <my-header @kwHandle="kwHandle"></my-header>
        <div class="productPage bg_f5f5f5">
            <bread :breadName="['礼物搜索',`${kw}`]"></bread> 
            <div class="where bg_fff">
                <div class="w1200 center">
                    <!-- f1 -->
                    <div class="f1 f">
                        <div class="left d-flex">
                            <div class="tc">场合：</div>
                            <ul :style="moreF1?'height:56px;':''">
                                <li v-for="(item,index) of data[0]" :key="index">
                                    <router-link :class="searchI==index?'textRed':''" class="changeRed" :to="/Products/+item">{{item}}</router-link> 
                                </li>
                            </ul>
                        </div>
                        <div class="more" @click="moreF1=!moreF1">更多
                            <i :class="moreF1?'toggleBgImg':''"></i>
                        </div>
                    </div>
                    <!-- f2 -->
                    <div class="f2 f">
                        <div class="left d-flex">
                            <div class="tc">场合：</div>
                            <ul>
                                <li v-for="(item,index) of data[1]" :key="index">
                                    <router-link :class="searchI==index?'textRed':''" class="changeRed" :to="/Products/+item">{{item}}</router-link> 
                                </li>
                            </ul>
                        </div>
                        <div class="more">更多
                            <i></i>
                        </div>
                    </div>
                    <!-- f3 -->
                    <div class="f3 f">
                        <div class="left d-flex">
                            <div class="tc">场合：</div>
                            <ul>
                                <li v-for="(item,index) of data[2]" :key="index">
                                    <router-link :class="searchI==index?'textRed':''" class="changeRed" :to="/Products/+item">{{item}}</router-link> 
                                </li>
                            </ul>
                        </div>
                        <!-- <div class="more">更多
                            <i></i>
                        </div> -->
                    </div>
                    <!-- f4 -->
                    <div class="f4 f">
                        <div class="left d-flex">
                            <div class="tc">场合：</div>
                            <ul>
                                <li v-for="(item,index) of data[3]" :key="index">
                                    <router-link  :class="searchI==index?'textRed':''" class="changeRed" :to="/Products/+item">{{item}}</router-link> 
                                </li>
                            </ul>
                        </div>
                        <!-- <div class="more">更多
                            <i></i>
                        </div> -->
                    </div>
                </div>
            </div> 
            <!-- 具体的商品列表 -->
                <!-- 畅销｜ 最新｜ 价格由低到高｜ 价格由高到低 -->
                <div class="w1200 where_title d-flex">
                    <div class="left">
                        <router-link to="">畅销</router-link>
                        <span>|</span>
                        <router-link to="">最新</router-link>
                        <span>|</span>
                        <router-link to="">价格由低到高</router-link>
                        <span>|</span>
                        <router-link to="">价格由高到低</router-link>
                    </div>
                    <div class="right">
                        <input type="checkbox">仅显示可定制商品
                    </div>
                </div>
                <div class="w1200">

                </div>   
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
export default {
    data(){
        return {
           newKw:"" ,
           // 点击的是哪个条件
           searchI:0,
         //搜索条件 点击更多 展开与收起
          moreF1:false,
          moreF2:false,    
          //搜索条件f1的数据
          data:[['全部','生日','结婚','订婚','表白','纪念日','本命年','乔迁',
          '晋升','分别','毕业','答谢','祝贺','致歉','约会','见面','会议','拜访','年会','福利'],
          ['全部','男朋友','女朋友','男生','女生','老公','老婆','兄弟','姐妹','闺蜜','父亲',
           '母亲','男士','女士','老师','长辈','孩子','同事','客户','领导','学生','外国人','自己'],
          ['全部','创意','定制','星座','音乐','浪漫','吃货','爱车','烟民','办公','养生','潮人','运动','家居','酒茶','实用'],
          ['全部','100以下','100-200','200-300','300-500','500以上']]

        }
    },
    props:{kw:{type:String}},
    created(){
    },
    methods:{
        kwHandle(kw){
            this.newKw=kw;
            console.log(this.newKw);
        },
        more(){

        }
    }
}
</script>
<style>
     @import url(../assets/css/products.css);
</style>

