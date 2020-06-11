<template>
    <div class="login_bg">
        <table></table>
        <div class="service">
            <span>服务热线：0755-86380505 (8:00－24:00)</span>
            <a href="javascript:;">QQ在线交谈</a>
        </div>
        <router-view></router-view>
    </div>   
</template>

<script>
export default {

}
</script>

<style scoped>
    /* 中间部分 背景和尺寸*/
    .login_bg{
        width:100%;
        height:766px;
        background:url(/images/login_bg.jpg) no-repeat center;
        position: relative;
    }
    /* 服务热线 弹性布局 */
    .login_bg .service{
        box-sizing: border-box;
        width:100%;
        height:62px;
        display: flex;
        padding:20px;
        padding-right:10%;
        color:#666;
        justify-content:flex-end;
        align-items: center;
        }
    .login_bg .service span{
        font-size:12px;
        padding:0 10px 0;
    }
    /* QQ在线交谈 圆角 过渡样式 */
    .login_bg .service a{
        display:inline-block;
        width:86px;
        height:18px;
        border:2px solid #979795;
        text-align:center;
        line-height:18px;
        border-radius:22px;
        font-size:12px;
        color:#666;
        transition:.3s;
    }
    .login_bg .service a:hover{
        color:#e52e2d;
        border-color:#e52e2d;
    }
</style>>

