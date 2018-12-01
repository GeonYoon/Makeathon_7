var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var serialPort = require('serialprt');
var stringDecoder = require('string_decoder').StringDecoder;

var mongoUrl = 'mongodb://localhost:27017/makeathon';
var port = new serialPort('/dev/ttyACM0', {
  baudRate: 9600
});

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

var line = '';
var sensor_value = '';

port.on('data', function(data) {
  var decoder = new stringDecoder('utf8');
  var textData = decoder.write(data);
  line += textData;
  var li = line.split('\n');
  if(li.length>1){
    sensor_value = li[li.length-2]
    line = ''
  }
  console.log(sensor_value)
})

app.listen(6508, function () {
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
