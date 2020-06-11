// 引入express
var express=require('express');
var cors=require('cors');
const session=require('express-session');
// 引入connect-history-api-fallback(专门支持history重定向的组件)
const history=require('connect-history-api-fallback');
// 引入用户路由器
var userRouter=require('./routes/userRouter.js');
var indexRouter=require('./routes/indexRouter.js');
var detailRouter=require('./routes/detailRouter.js');
var ProductRouter=require('./routes/product.js');
var cartRouter=require('./routes/cartRouter.js');
// 引入body-parser中间件
var bodyParser=require('body-parser');
// 引入token模块
const jwt=require('./jwt.js');

// 创建web服务器
var app=express();
// 监听端口设置
app.listen(5050);
// 静态资源托管public
app.use(express.static('public'));
//使用body-parser中间件 用来接收有请求的formdata
app.use(bodyParser.urlencoded({
    extended:false
}));
// 使用connect-history-api-fallback中间件
app.use(history());
// 跨域配置
app.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080"],
    credentials:true //每次请求是否验证
}));
// // 配置session 要在所有请求之前
// app.use(session({
//   secret:"128位安全字符串",  // 安全字符串
//   resave:true,             //每次请求保存数据
//   saveUninitialized:true  //保存初始化数据
// }));
// user cart路由需要用户登录信息
app.use((req,res,next)=>{
  if(req.url!=('/user/v1/reg') && req.url!=('/user/getUser') && ( req.url.startsWith('/user') || req.url.startsWith('/cart'))){
    console.log(req.url);
    let token=req.headers.token;
    let result=jwt.verifyToken(token);
    console.log(result);
    // 通过就往下进行，否则就返回登录信息错误
    if(result==undefined){
      res.send({status:403,msg:'未提供证书'});
      // token过期
    }else if (result.name == 'TokenExpiredError') {
      res.send({status: 403, msg: '登录超时，请重新登录'});
    } else if (result.name=="JsonWebTokenError"){
      res.send({status: 403, msg: '证书出错'})
    } else{
      req.user=result;
      next();
    }
  }else{
    next();
  }
});

// 使用路由器 挂载到user下
app.use('/user',userRouter);
app.use('/index',indexRouter);
app.use('/detail',detailRouter);
app.use('/product',ProductRouter);
app.use('/cart',cartRouter);