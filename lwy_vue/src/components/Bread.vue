<template>
  <div class="currentloc bg_f5f5f5">
    <p class="w1200">
        <span>
            <router-link to="/Index" class="changeRed">首页</router-link>
            &nbsp; / &nbsp; {{breadName}}
        </span>
        <span>
            服务热线：0755-86380505 (8:00－24:00)
            <router-link to="" class="QQChat">QQ在线交谈</router-link>
        </span>
    </p>
</div>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  props:{breadName:{default:""}}
}
</script>
<style scoped>
  .currentloc p{
    height:22px;
    padding:20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }
  .currentloc p a:first-child{
      color:#333;
  }
  .currentloc p a:first-child:hover{
      color:#c1413d;
      transition: .2s linear;  
  }

  /* QQ在线交谈 圆角 过渡样式 */
  .currentloc p .QQChat{
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
      margin-left:10px;
  }
  .currentloc p .QQChat:hover{
    color:#e52e2d;
    border-color:#e52e2d;
  }
</style>


