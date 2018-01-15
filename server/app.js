var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//引入socket.io
var socket_io = require('socket.io');
var io = socket_io();

var index = require('./routes/index');
var user = require('./routes/user');
var show = require('./routes/show');
var demo = require('./routes/demo');

var app = express();
let chats = require('./models/chat.js');
function handle4err(err,socket){
}
app.io = io; //将io附属在app上 记得要在www文件里attach(server)
io.set('origins', '*:*');
io.on( "connection", function( socket ){    
    console.log( "io connected" );
    socket.on('sendMsg', function(data){
        // console.log('data',data)
        // io.emit('recvMsg',data)
        const {from, to, msg} = data;
        const chatId = [from, to].sort().join('_');
        const created_time = Date.now();
        chats.create({from, to, chatId, created_time,content:msg},(err,doc)=>{
            if(err){
              handle4err(err,socket);
              return
            }  
            io.emit('recvMsg', Object.assign({},doc))            
        })
    })
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mongoose
var mongoose = require('mongoose');
//链接数据库
mongoose.connect('mongodb://user:!QAZ2wsx@127.0.0.1:27017/ticket',{useMongoClient:true});
//监听是否链接成功
mongoose.connection.on('connected', function (){
    console.log('MongoDB connected success.')
})
mongoose.connection.on('error', function (){
    console.log('MongoDB connected fail.')
})
mongoose.connection.on('disconnected', function (){
    console.log('MongoDB connected disconnected.')
})

app.use('/', index);
app.use('/user', user);
app.use('/show', show);
app.use('/demo', demo);

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

module.exports = app;
