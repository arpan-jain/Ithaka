//@uthor:Arpan

var server=require("./server");
var router=require("./router");
var requestHandlers=require("./handler");

var handle={}
handle["/"]=requestHandlers.start;
handle["/start"]=requestHandlers.start;
handle["/upload"]=requestHandlers.upload;
handle["/register.html"]=requestHandlers.register_template;
handle["/register"]=requestHandlers.register;


server.start(router.route,handle);
