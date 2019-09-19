var express=require('express');
// 引入pool
var pool=require('../pool.js');
// 创建路由
var detailRouter=express.Router();
detailRouter.get("/getPro",(req,res)=>{
    var pid=req.query.pid;
    var output={
      product:{},
      specs:[],
      pics:[]
    }
    if(pid!==undefined){
      var sql1=`select * from lwy_product where pid=?`;
      pool.query(sql1,[pid],(err,result)=>{
        if(err) console.log(err);
        output.product=result[0];
        var family_id=output.product["family_id"];
        var sql2=`select spec,pid from lwy_product where family_id=?`;
        pool.query(sql2,[family_id],(err,result)=>{
          if(err) console.log(err);
          output.specs=result;
          var sql3=`select * from lwy_pro_pic where lid=?`
          pool.query(sql3,[pid],(err,result)=>{
            if(err) console.log(err);
            output.pics=result;
            res.send(output);
          })
        })
      })
    }else{
      res.send(output);
    }
  });
// 导出detailRouter对象
module.exports=detailRouter;