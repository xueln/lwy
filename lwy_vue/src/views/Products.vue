<template>
    <div>
        <my-header></my-header>
        <div class="productPage bg_f5f5f5">
            <bread :breadName="['礼物搜索',`${kw}`]"></bread> 
            <div class="where bg_fff">
                <div class="w1200 center">
                   <where-item :data="data[0]"></where-item>
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
                        <a href="javascript:;" class="block" @click="isDiy=!isDiy" v-text="isDiy?'√':''"></a>仅显示可定制商品
                    </div>
                </div>
                <ul class="w1200 proList">
                    <li>
                        <img src="http://127.0.0.1:5050/img/detail/md_diy1.jpg" alt="">
                        <p >BeeFo小唱机</p>
                        <p v-text="'¥'+399.0"></p>
                        <p>
                            <a href="javascript:;">可定制</a>
                            <span>5人评价</span>
                        </p>
                    </li>
                    <li>
                        <img src="http://127.0.0.1:5050/img/detail/md_diy1.jpg" alt="">
                        <p >BeeFo小唱机</p>
                        <p v-text="'¥'+399.0"></p>
                        <p>
                            <a href="javascript:;">可定制</a>
                            <span>5人评价</span>
                        </p>
                    </li>
                </ul>   
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
import WhereItem from '../components/product/WhereItem.vue'
export default {
    data(){
        return {
          //搜索条件f1的数据
          data:[['全部','生日','结婚','订婚','表白','纪念日','本命年','乔迁',
          '晋升','分别','毕业','答谢','祝贺','致歉','约会','见面','会议','拜访','年会','福利'],
          ['全部','男朋友','女朋友','男生','女生','老公','老婆','兄弟','姐妹','闺蜜','父亲',
           '母亲','男士','女士','老师','长辈','孩子','同事','客户','领导','学生','外国人','自己'],
          ['全部','创意','定制','星座','音乐','浪漫','吃货','爱车','烟民','办公','养生','潮人','运动','家居','酒茶','实用'],
          ['全部','100以下','100-200','200-300','300-500','500以上']],
        //   是否选择了仅显示定制商品
          isDiy:false
        }
    },
    props:{kw:{type:String}},
    components:{'where-item':WhereItem},
    created(){
    },
    methods:{
       loadMore(pno=0){
           (async ()=>{
               var res=await this.axios.get('product/pros',{
                   params:{
                       pno  //要查询第几页
                   }
               });
               console.log(res.data);
           })();
       } 
    },
    watch:{
        // 只要地址栏参数发生改变
        kw(){
            // 就重新查询
            console.log(this.kw);
        }
    }
}
</script>
<style>
     @import url(../assets/css/products.css);
</style>

