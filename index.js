const express=require("express");
const path=require("path");
require("dotenv").config();
//app express
const app=express();
//node server 
const server=require("http").createServer(app);
module.exports.io   =   require  (  'socket.io'  )  (  server  )  ; 
require("./sockets/sockets");




const publicPath=path.resolve(__dirname,"public");

app.use(express.static(publicPath));


server.listen(process.env.PORT,(err)=>{
    if(err)throw new Error();
    console.log("servidor corrriendo en puerto",process.env.PORT);
})