var express = require('express');   // 引入express模块
var path = require('path');   // 引入path模块,该模块包括了一些处理文件路径的功能
var favicon = require('serve-favicon');   // 图标缓存服务中间件
var logger = require('morgan');   // HTTP请求日志中间件
var cookieParser = require('cookie-parser');   // cookie操作中间件
var bodyParser = require('body-parser');
// body-parser插件用于post参数的解析，最常用的是其中的json和urlencoded的parser，可分别对以JSON格式的post参数和urlencoded的post参数进行解析，均可获得一个JSON化的req.body

var index = require('./routes/index');
var users = require('./routes/users');  // 自定义路由模块的引用

// var partials = require('express-partials');   // 片段视图

var app = express();   // 创建一个 Express 应用。express()是一个由express模块导出的入口（top-level）函数。

// view engine setup
app.set('views', path.join(__dirname, 'views'));   // 设置views的目录,__dirname全局变量表示当前执行脚本所在的目录
app.set('view engine', 'ejs');   // 设置渲染引擎

// Express 依赖于 connect， 提供了大量的中间件，可以通过 app.use 启用
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(partials());   // 片段视图的应用
app.use(logger('dev'));   // 日志设置，使用参见https://github.com/expressjs/morgan
app.use(bodyParser.json());   // 解析JSON格式的post参数
app.use(bodyParser.urlencoded({ extended: false }));   // 解析urlencoeded编码的post参数，URLEncoded编码中,所有的字符均为ANSCII码
app.use(cookieParser());   // cookie设置
app.use(express.static(path.join(__dirname, 'public')));   // 静态目录设置

// 路由
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);
console.log('Express server listening on port 3000 in development mode');

module.exports = app;
