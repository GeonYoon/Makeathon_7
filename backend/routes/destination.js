var express = require('express');
var path = require('path');
var router = express.Router();

var spawn = require('child_process').spawn,
    py    = spawn('python', ['test.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body.destination)
  py.stdout.on('data', function(data){
    dataString += data.toString();
  });
  py.stdout.on('end', function(){
    console.log('Sum of numbers=',dataString);
    res.send(dataString)
  })
  py.stdin.write(JSON.stringify(data));
  py.stdin.end();
});

module.exports = router;