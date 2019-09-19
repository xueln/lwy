<template>
    <div>
        <my-header></my-header>
        <div id="page_detail">
            <bread breadName="BeeFo小唱机"></bread>
            <div class="goods_info">
                <div class="center w1200 d-flex">
                    <div class="images d-flex">
                        <!-- 小图 -->
                        <ul class="d-flex">
                            <li v-for="(item,index) of pics" :key="index" >
                                <img :src="imgUrl+item.sm" alt=""  :class="imgClasses[index]" @mouseover="changeImg(index)">
                            </li>
                        </ul>
                        <!-- 中图 -->
                        <div class="mdImg relative">
                            <img :src="imgUrl+pics[i].md" alt="">
                            <div v-show="enter" class="smMask"></div>
                            <div class="Mask" @mouseover="enter=!enter" @mouseout="enter=!enter"></div>
                        </div>
                    </div>
                    <div class="goods_attr">
                        <h2 v-text="product.title"></h2>
                        <h3 class="subtitle" v-text="product.subtitle"></h3>
                        <div class="good_price d-flex">
                            <span>{{product.price.toFixed(2)}}元</span>
                            <span class="color666">有现货</span>
                        </div>
                        <div class="specs">
                            <div @click="selectSpec">
                                <span class="block color666">选择规格:</span>
                                <router-link :to="/Details/+item.pid" v-for="(item,specI) of specs" :key="specI" class="block option" :class="specs[specI].optionClass" v-text="item.spec" :data-specI="specI"></router-link>
                            </div>
                            <div class="colors">
                                <p>
                                  <span class="block color666">礼物颜色:</span>  
                                </p>
                                <router-link to="" v-for="(item,index) of pics" :key="index" class="block option" v-text="item.color"></router-link>
                            </div>
                        </div>
                        <div class="buy">
                            <router-link to="" >立即购买</router-link>
                            <a href="javascript:;" class="sc" @click="bgImgHandle">
                                <i :class="bgImg"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <tool-bars></tool-bars>   
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
export default {
    data(){
        return{
            enter:false,
            bgImg:{
               bgImgClass:false 
            },
            product:{price:0},
            pics:[{md:'img/detail/md1.jpg',sm:'img/detail/sm1.jpg',lg:'img/detail/lg1.jpg'}],
            specs:[{optionClass:{optionSelected:true}},{optionClass:{optionSelected:false}}] ,
            imgUrl:"http://127.0.0.1:5050/",
            // 控制每张小图片鼠标滑过的样式
            imgClasses:[{borderRed:true}],
            // 判断是选中的哪一张小图片
            i:0,
        }
    },
    props:{pid:{default:""}},
    created(){
        console.log(this.pid);
        (async ()=>{
            var res=await this.axios.get('detail/getPro',{
                params:{
                    pid:this.pid
                }
            });
            // console.log(res.data);
            var obj=res.data;
            this.product=obj.product;
            this.pics=obj.pics;
            for(var i=0;i<this.pics.length;i++){
                this.imgClasses.push({borderRed:false});
            }
            this.specs=obj.specs;
            // 给每一个规格对象里都添加控制样式的变量
            for (var i=0;i<this.specs.length;i++) {
                if(i==0){
                   this.specs[i].optionClass={optionSelected:true}; 
                }else{
                    this.specs[i].optionClass={optionSelected:false};
                }   
            }
            console.log(this.specs);
            // console.log(this.product,this.pics,this.specs,this.imgClasses);
        })();
    },
    methods:{
        // 规格的选择
        selectSpec(e){
            if(e.target.nodeName=="A"){
                var specI=e.target.dataset.specI;
                console.log(specI);
                // this.specs[spec_i].optionClass.optionSelected=true;
                // this.specs[specI].optionClass.optionSelected=true;
                // for (var s=0;s<this.specs.length;s++) {
                //     if(s==specI){
                //         continue;
                //     }
                //     this.specs[s].optionClass.optionSelected=false;
                   
                // }
               
            }
            
        },
        // 鼠标移到哪个小图片 哪个小图片就加上红色边框 并且切换对应的大图片
        changeImg(i){
            // 其他小图片去掉红色边框
            for(var j=0;j<this.imgClasses.length;j++){
                if(this.imgClasses[j].borderRed==true){
                    this.imgClasses[j].borderRed=false;
                }
            }
            // 当前的小图片加边框
            this.imgClasses[i].borderRed=true;
            // 切换大图片
            this.i=i; 

        },
        bgImgHandle(){
            (async ()=>{
                var res=await this.axios.get('user/isLogin');
                console.log(res.data);
                if(res.data.code==-1){
                    alert("请先登录！登录后才能收藏");
                }else{
                    this.bgImg.bgImgClass=!this.bgImg.bgImgClass; 
                }
            })();
           
        }
    }

}
</script>
<style scoped>
    @import url(../assets/css/details.css);
</style>
