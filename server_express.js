//@uthor:Arpan
//using express for node.js
var express = require('express');
var app = express();
var path = require('path');

app.use(express.bodyParser());

var server = app.listen(8888);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/register.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/register.html'));
});
 
app.post('/register',function(req,res){
  console.log(req.baseUrl);
  console.log(req.params);
  console.log(req.body);
  res.status(200).send('Hey You have been registered in our database');
}); 
