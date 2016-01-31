//@uthor:Arpan
var express = require('express');
var app = express();
var path = require('path');
var bodyparser =require('body-parser');
var mysql= require('mysql');
var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '6277',
   database : 'ithaka'
 });
var md5 = require ('md5');
 
 
app.use(bodyparser());

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
  var fname=req.body.fname;console.log(fname);
  var lname=req.body.lname;console.log(lname);
  var gender=req.body.gender;console.log(gender);
  var email_id=req.body.email;console.log(email_id);
  var pass=md5(req.body.pass);console.log(pass);
  connection.connect();
  var query= connection.query('insert into user(fname,lname,gender,email_id,password) values(\"'+fname+'\",\"'+lname+'\",\"'+gender+'\",\"'+email_id+'\",\"'+pass+'\")', function(err, rows, fields) {
   if (err)
     console.log('Error while performing Query.');
 });
  console.log(query.sql);
  res.status(200).send('Hey You have been registered in our database');
  
 connection.end();
}); 
