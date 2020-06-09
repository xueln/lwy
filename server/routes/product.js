var express=require('express');
// 引入pool
var pool=require('../pool.js');
// 创建路由
var ProductRouter=express.Router();
ProductRouter.get('/pros',(req,res)=>{
  var kw=req.query.kw;
  var output={
    count:7,
    pageSize:2,
    pageCount:0,
    pno:req.query.pno||0,
    data:[]
  };
  // 查询图片
  var sql;
  if(!kw){
    sql="select pid,family_id,title,price,isDiy,md from lwy_product limit ?,?";
  }else{
    // 礼物 情人
    kw=kw.split(" ");
    kw.forEach((e,i,arr)=>{arr[i]=`title like '%${e}%'`});
    kw=kw.join(" and ");
    sql=`select pid,family_id,title,price,isDiy,md from lwy_product where ${kw} limit ?,?`;
  }
  
  pool.query(sql,[output.pageSize*output.pno,output.pageSize],(err,result)=>{
    if(err) throw err;
    output.data=result;
    // output.count=result.length;
    output.pageCount=Math.ceil(output.count/output.pageSize);
    console.log(output); 
    res.send(output);
  });
});
// 导出ProductRouter对象
module.exports=ProductRouter;