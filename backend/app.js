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
var spawn = require('child_process').spawn,
    py    = spawn('python', ['pose_recognizer.py'])
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/main', indexRouter);

dataString = ''

var imageArray = '/assets/starfield/KakaoTalk_Photo_2018-12-02-06-23-50.jpeg,/assets/starfield/KakaoTalk_Photo_2018-12-02-06-24-47.jpeg,/assets/starfield/KakaoTalk_Photo_2018-12-02-06-25-15.jpeg,/assets/starfield/KakaoTalk_Photo_2018-12-02-06-26-06.jpeg,/assets/starfield/KakaoTalk_Photo_2018-12-02-06-26-30.jpeg'

app.post('/destination', function(req, res, next) {
  var destination = req.body.destination
  if(destination == 'IKEA') {
    imageArray = '/assets/ikea/KakaoTalk_Photo_2018-12-02-06-28-16.jpeg,/assets/ikea/KakaoTalk_Photo_2018-12-02-06-28-35.jpeg,/assets/ikea/KakaoTalk_Photo_2018-12-02-06-28-41.jpeg,/assets/ikea/KakaoTalk_Photo_2018-12-02-06-29-09.jpeg,/assets/ikea/KakaoTalk_Photo_2018-12-02-06-29-24.jpeg'

  } else if(destination == 'HangJu_SanSung') {
    imageArray ='/assets/hangju/KakaoTalk_Photo_2018-12-02-06-32-35.jpeg,/assets/hangju/KakaoTalk_Photo_2018-12-02-06-33-38.jpeg,/assets/hangju/KakaoTalk_Photo_2018-12-02-06-34-05.jpeg,/assets/hangju/KakaoTalk_Photo_2018-12-02-06-34-09.jpeg,/assets/hangju/KakaoTalk_Photo_2018-12-02-06-35-06.jpeg'

  } else if(destination == 'KWave_Gallery') {
    imageArray = '/assets/kwave/KakaoTalk_Photo_2018-12-02-06-35-40.jpeg,/assets/kwave/KakaoTalk_Photo_2018-12-02-06-36-00.jpeg,/assets/kwave/KakaoTalk_Photo_2018-12-02-06-36-14.jpeg, /assets/kwave/KakaoTalk_Photo_2018-12-02-06-36-44.jpeg, /assets/kwave/KakaoTalk_Photo_2018-12-02-06-37-18.jpeg'

  } else if(destination == 'Starfield') {
    imageArray = '/assets/starfield/KakaoTalk_Photo_2018-12-02-06-23-50.jpeg,/assets/starfield/KakaoTalk_Photo_2018-12-02-06-24-47.jpeg,/assets/starfield/KakaoTalk_Photo_2018-12-02-06-25-15.jpeg,/assets/starfield/KakaoTalk_Photo_2018-12-02-06-26-06.jpeg,/assets/starfield/KakaoTalk_Photo_2018-12-02-06-26-30.jpeg'
  }
  res.send('ok')
})
app.use(express.static(path.join(__dirname, 'public')));

var port = new SerialPort('/dev/ttyACM0',{
  baudRate: 9600
});

var line = '';
var sensor_value = '';
var sensor_value_prev = '';
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

// io.on('connection', function (socket) {
//   console.log('connect with' + socket.id)
//   setInterval(function () {
//     // if(sensor_value !== sensor_value_prev){
//       if (sensor_value==='0') {
//         socket.emit('busData', {seat: false, belt: false, stop: false, image: ''})
//       } else if(sensor_value==='1') {
//         socket.emit('busData', {seat: false, belt: false, stop: true, image: imageArray})
//       } else if(sensor_value==='2') {
//         socket.emit('busData', {seat: false, belt: true, stop: false, image: ''})
//       } else if(sensor_value==='3') {
//         socket.emit('busData', {seat: false, belt: true, stop: true, image: imageArray})
//       } else if(sensor_value==='4') {
//         socket.emit('busData', {seat: true, belt: false, stop: false, image: ''})
//       } else if(sensor_value==='5') {
//         socket.emit('busData', {seat: true, belt: false, stop: true, image: imageArray})
//       } else if(sensor_value==='6') {
//         socket.emit('busData', {seat: true, belt: true, stop: false, image: ''})
//       } else if(sensor_value==='7') {
//         socket.emit('busData', {seat: true, belt: true, stop: true, image: imageArray})
//       }
//     //   sensor_value_prev = sensor_value;
//     // }
//
//   }, 1000)
// })

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
