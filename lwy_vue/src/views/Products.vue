<template>
    <div>
        <my-header></my-header>
        <div class="productPage bg_f5f5f5">
            <bread :breadName="['礼物搜索',`${kw}`]"></bread> 
            <div class="where bg_fff">
                <div class="w1200 center">
                   <where-item   whereTitle="场合" :data="data[0]"></where-item>
                   <where-item class="borderTop"  whereTitle="对象" :data="data[1]"></where-item>
                   <where-item class="borderTop" whereTitle="分类" :data="data[2]"></where-item>
                   <where-item class="borderTop" whereTitle="价格" :data="data[3]"></where-item>
                </div>
            </div> 
            <!-- 具体的商品列表 -->
                <!-- 畅销｜ 最新｜ 价格由低到高｜ 价格由高到低 -->
                <div class="w1200 where_title d-flex">
                    <div class="left" @click="order">
                        <router-link  class="changeRed" to="" data-id="1" :class="orderIndex==1?'orderText':''">畅销</router-link>
                        <span>|</span>
                        <router-link to="" class="changeRed" data-id="2" :class="orderIndex==2?'orderText':''">最新</router-link>
                        <span>|</span>
                        <router-link to="" class="changeRed" data-id="3" :class="orderIndex==3?'orderText':''">价格由低到高</router-link>
                        <span>|</span>
                        <router-link to="" class="changeRed" data-id="4" :class="orderIndex==4?'orderText':''">价格由高到低</router-link>
                    </div>
                    <div class="right">
                        <a href="javascript:;" class="block" @click="isDiy=!isDiy" v-text="isDiy?'√':''"></a>仅显示可定制商品
                    </div>
                </div>
                <ul class="w1200 proList">
                    <li v-for="(item,index) of newProList" :key="index">
                        <router-link :to="/Details/+item.pid">
                             <img :src="imgUrl+item.md" alt="">
                        </router-link>
                        <p class="title mt20">
                            <router-link class="changeRed" v-text="item.title" :to="/Details/+item.pid"></router-link>
                        </p>
                        <p v-text="'¥'+item.price.toFixed(2)"></p>
                        <p class="mt20 font12">
                            <a v-if="item.isDiy" class="font12" :class="item['diyClass']" href="javascript:;" @click="clickDiy(index)">可定制</a>
                            <span>5人评价</span>
                        </p>
                    </li>
                </ul>
                   <!-- 页码 -->
                <div class="pagers w1200">
                    <a :class="pno==0?'':'prevHover'" disabled="true" class="prev" href="javascript:;" @click="prevNext(-1)"></a>
                    <a  v-for="i of pageCount" :class="pno==i-1?'pnoActive':''" :key="i" class="pager" href="javascript:;" v-text="i" @click="toPage(i)"></a>
                    <a :class="pno==pageCount-1?'':'nextHover'" class="next" @click="prevNext(1)" href="javascript:;"></a>
                </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
import WhereItem from '../components/product/WhereItem.vue'
import { inherits } from 'util';
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
          isDiy:false,
          orderIndex:-1,
          proList:[],
          newProList:[],//用于筛选条件
          pno:0,
          pageCount:0,
          imgUrl:"http://127.0.0.1:5050/",
          diyIndex:-1,
          diyClass:{active:false},
          diyClassList:[{active:false},{active:false},{active:false},{active:false},{active:false}]
        }
    },
    // props:{kw:{type:String}},
    components:{'where-item':WhereItem},
    created(){
        this.loadMore();
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
               this.newProList=this.proList=res.data.data;
               for(var i=0;i<this.newProList.length;i++){
                   this.$set(this.newProList[i],"diyClass",{active:false});
               }
               this.pno=res.data.pno;
               this.pageCount=res.data.pageCount;
               console.log(this.proList,this.pno,this.pageCount);
           })();
       } ,
        //    排序方式
        order(e){
            if(e.target.nodeName=="A"){
                this.orderIndex=e.target.dataset.id; 
                // if(this.orderIndex==3){
                //     this.newProList.sort((a,b)=>a.price-b.price);
                // }
            }
        },
    //    点击每个商品上的可定制按钮 触发的事件
       clickDiy(i){
           console.log(i);
           this.newProList[i].diyClass.active=!this.newProList[i].diyClass.active;
       },
    //    分页跳转
    toPage(i){
        this.pno=i-1;
        this.loadMore(i-1);
        console.log(this.pno,i);
    },
    // 点击两边的上一页 下一页
    prevNext(p){
        if(p==-1 && this.pno==0 || p==1 && this.pno==(this.pageCount-1)){
            return;
        }
        p+=parseInt(this.pno);
        this.pno=p;
        this.loadMore(p);
    }
    },
    watch:{
        // 只要地址栏参数发生改变
        // $route(){
        //     // 就重新查询
        //     console.log(this.kw);
        // }
    }
}
</script>
<style>
     @import url(../assets/css/products.css);
</style>

