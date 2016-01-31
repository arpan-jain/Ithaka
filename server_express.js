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

app.get('/login.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
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
   else
     res.status(200).send('Hey You have been registered in our database');
  connection.end(); 
 });
  console.log(query.sql);
}); 

app.post('/login',function(req,res){
  var user_email=req.body.email;console.log(user_email);
  var user_pass=md5(req.body.pass);console.log(user_pass);
  var response_msg=null;
  connection.connect();
  var query= connection.query('select * from user where email_id=\"'+user_email+'\"', function(err, rows, fields) {
   if (err)
     console.log('Error while performing Query.'); 
   else 
     {
      if(rows[0]==undefined)
       { response_msg="Invalid Email_id";
         console.log("no user present");
           
         res.status(200).send(" "+response_msg); 
        }
       else
       {
          if(user_pass==rows[0].password)
          {
            response_msg="Hi "+rows[0].fname+" "+rows[0].lname+"! Welcome to Ithaka";
            console.log(response_msg);
            res.status(200).send(" "+response_msg);
          }
          else
          {
            response_msg="Invalid password";
            console.log("wrong password");
            
            res.status(200).send(" "+response_msg);
          }
       } 
     }
     connection.end();
 });
  console.log(query.sql);
  console.log(response_msg);
 // res.status(200).send(" "+response_msg);
 //connection.end();
}); 
