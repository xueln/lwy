<template>
    <div class="toolbars" v-show="scrollTop>500">
        <a href="javascript:;" class="block"><i class="block"></i></a>
        <a @click="toTop" href="javascript:;" class="block"><i class="block"></i></a>
    </div>
</template>
<script>

export default {
    data(){
        return {
            scrollTop:0
        }
    },
   created(){
       window.onscroll=()=>{
        // 页面滚动事件处理函数
        // 获取页面上方滚动超出的距离(有兼容性问题)
        this.scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
        this.$emit("scroll",this.scrollTop);
        
        //  console.log(this.scrollTop);    
       }
   },
   methods:{
       toTop(e){
        e.preventDefault();
        // 总距离
        var dist=this.scrollTop;
        // 总步数
        var steps=50;
        // 总时间   总时间/总步数不要小于10ms 这才是定时器最优的状态
        var dur=500;
        // 每步走多长
        var step=dist/steps;
        // 每步走多长时间
        var interval=dur/steps;
        var timer=setInterval(()=>{
            window.scrollBy(0,-step);
            steps--;
            if(steps==0){
                clearInterval(timer);
                console.log("停止");
            }
        })
       }
   }
}
</script>
<style scoped>
    /* 悬浮工具栏样式 */
    .toolbars{
        width:60px;
        height:auto;
        position:fixed;
        right:40px;
        bottom: 10%;
    }
    .toolbars a{
        width:100%;
        height:60px;
        background: #656766;
        display: flex;
        justify-content:center;
        align-items: center;
    }
    .toolbars a:first-child{
        margin-bottom: 10px;
    }
    .toolbars a:first-child i{
        width:35px;
        height:34px;
        background: url(../../public/images/bgr.png) no-repeat -190px -77px;
    
    }
    .toolbars a:last-child i{
        width:35px;
        height:18px;
        background: url(../../public/images/bgr.png) no-repeat -190px -112px;
    }
    .toolbars a:hover{
        background-color: #9e9e9e;
        transition:background .3s linear;
    }
</style>


