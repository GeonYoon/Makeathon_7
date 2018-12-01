var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
// var destinationRouter = require('./routes/destination')
var SerialPort = require("serialport");
var StringDecoder = require('string_decoder').StringDecoder;
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/main', indexRouter);
// app.use('/destination', destinationRouter);
app.post('/destination', function(req, res, next) {
  var destination = req.body.destination
  console.log(destination)
  // if(destination == '') {

  // } else if()
  res.send('ok')
})
app.use(express.static(path.join(__dirname, 'public')));

var port = new SerialPort('/dev/ttyACM0',{
  baudRate: 9600
});

var line = '';
var sensor_value = '';
port.on('data', function (data){
  var decoder = new StringDecoder('utf8');
  var textData = decoder.write(data);
  line += textData
  var li = line.split("\n");
  if(li.length>1){
    sensor_value = li[0]
    line = ''
  }
})

io.on('connection', function (socket) {
  console.log('connect with' + socket.id)
  socket.on('message', function(data) {
    console.log(data)
  })
  setInterval(function () {
    if (sensor_value==='0') {
      socket.emit('busData', {seat: false, belt: false, stop: false})
    } else if(sensor_value==='1') {
      socket.emit('busData', {seat: false, belt: false, stop: true})
    } else if(sensor_value==='2') {
      socket.emit('busData', {seat: false, belt: true, stop: false})
    } else if(sensor_value==='3') {
      socket.emit('busData', {seat: false, belt: true, stop: true})
    } else if(sensor_value==='4') {
      socket.emit('busData', {seat: true, belt: false, stop: false})
    } else if(sensor_value==='5') {
      socket.emit('busData', {seat: true, belt: false, stop: true})
    } else if(sensor_value==='6') {
      socket.emit('busData', {seat: true, belt: true, stop: false})
    } else if(sensor_value==='7') {
      socket.emit('busData', {seat: true, belt: true, stop: true})
    }
  }, 1000)
})

server.listen(6508, function () {
  console.log("Server running on 6508");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

//module.exports = app;
