//@uthor:Arpan
var swig  = require('swig');

var exec=require("child_process").exec;

var qs = require('querystring');

function start(request,response){
 console.log("Request handler 'start' was called.");
 swig.renderFile('index.html',{},function(err,output){
  if(err)
  {
   console.log();
  }
  else
  { 
    console.log(output);
   response.writeHead(200,{"Console-Type":"text/plain"});
   response.write(output);
   response.end();
  }
   });
 }

function register_template(request,response){
 console.log("Request handler 'start' was called.");
 swig.renderFile('register.html',{},function(err,output){
  if(err)
  {
   console.log();
  }
  else
  { 
    console.log(output);
   response.writeHead(200,{"Console-Type":"text/plain"});
   response.write(output);
   response.end();
  }
   });
 }

function upload(request,response){
 console.log("Request handler 'upload' was called."); 
 response.writeHead(200, {"Content-Type": "text/plain"}); 
 response.write("Hello Upload");
 response.end();
 }

function register(request,response){
console.log("Request for registering a new user recieved");
var post;
var body = '';

        request.on('data', function (data) {
            body += data;
        });
        
        request.on('end', function () {
            post = qs.parse(body);
            // use post['blah'], etc.
        });
         
response.writeHead(200,{"Console-Type":"text/plain"});
var result={
"First Name:" : post.first,
"Last Name:" :  post.last,
"Email Id:" :   post.email_id
    };
 response.write(result);
 
}


exports.start=start; 
exports.upload=upload;
exports.register=register;
exports.register_template=register_template;
