// 引入express
var express=require('express');
var cors=require('cors');
const session=require('express-session');
// 引入用户路由器
var userRouter=require('./routes/userRouter.js');
var indexRouter=require('./routes/indexRouter.js');
var detailRouter=require('./routes/detailRouter.js');
var ProductRouter=require('./routes/product.js');
// 引入body-parser中间件
var bodyParser=require('body-parser');
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
// 跨域配置
app.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080"],
    credentials:true //每次请求是否验证
}));
// 配置session 要在所有请求之前
app.use(session({
  secret:"128位安全字符串",  // 安全字符串
  resave:true,             //每次请求保存数据
  saveUninitialized:true  //保存初始化数据
}));
// 使用路由器 挂载到user下
app.use('/user',userRouter);
app.use('/index',indexRouter);
app.use('/detail',detailRouter);
app.use('/product',ProductRouter);