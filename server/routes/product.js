var express=require('express');
// 引入pool
var pool=require('../pool.js');
// 创建路由
var ProductRouter=express.Router();
ProductRouter.get('/pros',(req,res)=>{
  var output={
    count:0,
    pageSize:7,
    pageCount:0,
    pno:req.query.pno||0,
    data:[]
  };
  // 查询图片
  var sql="select pid,family_id,title,price,isDiy,md from lwy_product limit ?,?";
  pool.query(sql,[output.pageSize*output.pno,output.pageSize],(err,result)=>{
    if(err) throw err;
    output.data=result;
    output.count=result.length;
    output.pageCount=Math.ceil(output.count/output.pageSize);
    console.log(output); 
  });
});
// 导出userRouter对象
module.exports=ProductRouter;