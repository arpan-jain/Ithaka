//@uthor:Arpan
var express = require('express');
var app = express();
var path = require('path');
var bodyparser =require('body-parser');
//var mysql= require('mysql');
/*var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '6277',
   database : 'ithaka'
 });*/
var Sequelize = require('sequelize');
var md5 = require ('md5');
 
var sequelize = new Sequelize('ithaka', 'root', '6277', {
  host: 'localhost',
  dialect: 'mysql'
});


app.use(bodyparser());

var server = app.listen(8888);

//favourite hotels' table
var fav = sequelize.define('fav', {
  s_no: {
  type: Sequelize.INTEGER(2),
  autoIncrement: true,
  primaryKey: true
  },
  user_id: {
  type: Sequelize.INTEGER(10),
  },
  hotel_id: {
  type: Sequelize.INTEGER(10),
  }
} , 
  {
  tableName: 'fav',
  timestamps: false
});

//user table
var user = sequelize.define('user', {
  user_id: {
  type: Sequelize.INTEGER(10),
  primaryKey: true,
  autoIncrement: true,
  allowNull: false
  },
  fname: {
  type: Sequelize.STRING,
  defaultValue: null
  },
  lname: {
  type: Sequelize.STRING,
  defaultValue: null
  },
  gender: {
  type: Sequelize.ENUM('M', 'F'),
  allowNull: false
  },
  email_id: {
  type: Sequelize.STRING(512),
  defaultValue: null
  },
  password: {
  type: Sequelize.STRING(50),
  defaultValue: null
  }
},
  {
  tableName: 'user',
  timestamps: false
});

//hotel table
var hotel = sequelize.define('hotel', {
  hotel_id: {
  type: Sequelize.INTEGER(10),
  primaryKey: true,
  autoIncrement: true,
  allowNull: false
  },
  name: {
  type: Sequelize.STRING(1000),
  defaultValue: null
  },
  location: {
  type: Sequelize.STRING(1000),
  allowNull: false
  },
  stars: {
  type: Sequelize.ENUM('1','2','3','4','5'),
  defaultValue: null
  }
},
  {
  tableName: 'hotel',
  timestamps: false
});

hotel.hasMany(fav)
user.hasMany(fav);


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
 
app.get('/register_hotel.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/register_hotel.html'));
});
 
app.get('/get_hotels', function(req, res) {
 
  /*var query= connection.query('select * from hotel', function(err, rows, fields) {
   if (err)
     console.log('Error while performing Query.');
   else
     res.status(200).send(rows);
 });
  console.log(query.sql);*/
  
  hotel.findAll().then(function(hotels) {
  var result=JSON.stringify(hotels);
  console.log(result);
  res.status(200).send(result);
});
  
});

 
app.post('/register',function(req,res){
  var firstname=req.body.fname;console.log(firstname);
  var lastname=req.body.lname;console.log(lastname);
  var gen=req.body.gender;console.log(gen);
  var email=req.body.email;console.log(email);
  var pass=md5(req.body.pass);console.log(pass);
 // connection.connect();
 /* var query= connection.query('insert into user(fname,lname,gender,email_id,password) values(\"'+fname+'\",\"'+lname+'\",\"'+gender+'\",\"'+email_id+'\",\"'+pass+'\")', function(err, rows, fields) {
   if (err)
     console.log('Error while performing Query.');
   else
     res.status(200).send('Hey! You have been registered in our database');
 // connection.end(); 
 });
  console.log(query.sql);*/
  
  user.create({
        fname : firstname,
        lname: lastname,
        gender: gen,
        email_id: email,
        password: pass
    }).then(function(User) {
      console.log(User.get({plain:true}));
      res.status(200).send('Hey! You have been registered in our database');
     });
  
  
  
}); 

app.post('/login',function(req,res){
  var user_email=req.body.email;console.log(user_email);
  var user_pass=md5(req.body.pass);console.log(user_pass);
  var response_msg=null;
  //connection.connect();
/*var query= connection.query('select * from user where email_id=\"'+user_email+'\"', function(err, rows, fields) {
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
            connection.query('select * from hotel where hotel_id in (select hotel_id from fav where user_id='+rows[0].user_id+')', function(err, rows, fields){
            res.status(200).send(rows);
            });
          }
          else
          {
            response_msg="Invalid password";
            console.log("wrong password");
            
            res.status(200).send(" "+response_msg);
          }
       } 
     }
   //  connection.end();
 });*/
 user.findOne({ where: { email_id: user_email } }).then(function(User) {
  var result=JSON.stringify(User);
  //console.log(result);
  console.log("\n\n\n");
  if(result==null)
  {
         response_msg="Invalid Email_id";
         console.log("no user present");
         res.status(200).send(" "+response_msg); 
  }
  else
  {
      if(user_pass==User.password)
      {
         hotel.findAll({ include: [{model: fav, where: { user_id : User.user_id}}]}).then(function(hotels){
         result_hotels=JSON.stringify(hotels);
         console.log(result_hotels);
         res.status(200).send(result_hotels);
          });
      }
      else
      {
         response_msg="Invalid password";
         console.log("wrong password");
         res.status(200).send(" "+response_msg);
      }      
  }
});
 // res.status(200).send(" "+response_msg);
 //connection.end();
}); 

app.post('/register_hotel',function(req,res){
  var hotelname=req.body.name;console.log(hotelname);
  var loc=req.body.location;console.log(loc);
  var stars=req.body.stars;console.log(stars);
  //connection.connect();
 /*var query= connection.query('insert into hotel(name,location,stars) values(\"'+name+'\",\"'+location+'\",\"'+stars+'\")', function(err, rows, fields) {
   if (err)
     console.log('Error while performing Query.');
   else
     res.status(200).send('Hey! You have been registered in our database');
 // connection.end(); 
 });*/
 
 hotel.create({
        name : hotelname,
        location: loc,
        stars: stars
    }).then(function(Hotel) {
      console.log(Hotel.get({plain:true}));
      res.status(200).send('Hey! You have been registered in our database');
     });
}); 
