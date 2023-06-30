import express from 'express'
// import next from 'next';
import dotenv from 'dotenv'
// import {connectDB} from './config/db.js'
// import allRoutes from './routes/index.js'
import cookieparser from 'cookie-parser'
import bodyparser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import requestRouter from './Router/userRequest.js';
// import passport from "passport";
// import "./utils/passport.js";
// import session from 'express-session'
// import Invite from './model/inviteSchema.js'
// import Billing from './model/billingSchema.js'
// import Billing from './model/billingSchema.js'
// import Image from './model/imageSchema.js'
// import DogProfile from './model/dogProfileSchema.js'
// import Ip from './model/ipSchema.js'
// import cloudinary from 'cloudinary'
// import './utils/cloudinary.js'
// import MongoStore from 'connect-mongo'
// import User from './model/userSchema.js'
// import Info from './model/infoSchema.js'
// import Mobile from './model/mobileNumberSchema.js'
// import Meme from './model/memeSchema.js'
// import Events from './model/eventSchema.js'
// import cron from 'node-cron'
// import twilio from 'twilio'
// import fetch from 'node-fetch'
// import ip from 'ip'
// const secretKey = 'malibu';
// import CryptoJS from 'crypto-js'
// // import {} from '@msg91api/v5.0#6n91xmlhu4pcnz';
// import sdk from 'api';
//deployment
import http from 'http'
import path from 'path'
import fs from 'fs'
// import multer from 'multer'
const __dirname = path.resolve()
// import msg91 from "msg91";
// import axios from 'axios'
// const socketIO = require('socket.io');
// import socketIO from 'socket.io'
import { Server } from 'socket.io';
 
dotenv.config()
 
const port = process.env.PORT || 8080
// const port = process.env.PORT || 3000;
 
const dev = process.env.NODE_ENV !== 'production';
 
const app = express()
 
// const store = new MongoStore({
//   mongoUrl: process.env.MONGO_URI,
//   ttl: 60 * 60 * 24 * 7 
// });
 
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});
 
// app.use(session({
//                   secret:process.env.REACT_APP_PASSPORT_SECRET,
//                   resave:false,
//                   saveUninitialized:false,
//                   cookie:{maxAge:7 * 24 * 60 * 60 * 1000 },
//                   store:store
//                }))
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cors({  origin: process.env.NODE_ENV === 'development' ? process.env.DEV_URI :process.env.PROD_URI, credentials: true }))
app.use(cookieparser())
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
 

// function isIndianNumber(number) {
//   // Implement your logic to check if the number is Indian or not.
//   // You can use a library or regex pattern to determine the country code.
//   // Here, I'm assuming that if the number starts with "+91", it's an Indian number.
//   return number.startsWith("+91");
// }
 
 
// app.get('/ip/:IP',async(req,res)=>{
 
//    const {IP} = req.params
//    try{
//       const ipExists = await Ip.findOne({address:IP})
 
//       if(!ipExists){
//          return res.status(200).json({msg:"ip does not exist"})
//       }
//       return res.status(200).json(ipExists)
 
//    }catch(err){
//       console.log(err)
//    }
// })
 
 
 
//    app.use('/uploads',express.static('uploads'))
 
app.use('/request', requestRouter);
 
  //Message Sending
//   app.get("/hello", (req, res) => {
//      const ipAddress = req.headers['x-forwarded-for']
//      res.send(`Your IP address is: ${ipAddress}`);
//   }) 
 
//   var storage = multer.diskStorage({
//    destination:function(req,file,cb){
//       cb(null,'uploads')
//    },
//    filename:function(req,file,cb){
//       cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//    }
// })
 
// var upload = multer({
//    storage:storage
// })
//   app.post('/uploadphoto',upload.single('image'),async (req,res,next)=>{
//    var img = fs.readFileSync(req.file.path)
 
//    var encode_image = img.toString('base64')
 
//    var result={secure_url:"https://via.placeholder.com/1080x720.png"}
 
//    if(req.file){
//      result = await cloudinary.v2.uploader.upload(req.file.path)
//        var img = fs.readFileSync(req.file.path)
//        var encode_image = img.toString('base64')
//    }
 
//    var finalImg = new Image({
//       image:{
//        contentType:req.file.mimetype
//        },
//        path:result.secure_url,
//    })
//    await finalImg.save()
 
//    return res.status(200).json(result.secure_url)
// })
 
 
 
//   async function updateSchema(){
//   } 
 
 
if(process.env.NODE_ENV==="production"){
   app.use(express.static('client/dist'))
 
   app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
    })
}
 
else{
 
   app.get("*",(req,res)=>{
         res.send(`
               <div style="background-color:yellow;color:white">
                 <h2><a href="/api/auth/google/callback">login with google</a></h2>
                 <h2><a href="/api/auth/google/callback/eyJpbnZpdGVJRCI6IjY0MTliZmFjMGUxYTBhNDE5ZjBlYjhhNCIsInR5cGUiOiJpbnZpdGUifQ==">login with google</a></h2>
                 <h2><a href="/api/auth/linkedin/callback">login with linkedin</a></h2>
                 <h2><a href="/api/auth/facebook/callback">login with facebook</a></h2>
              </div>
              <div style="background-color:#5fb08e;color:white">
                 <h2><a href="/api/auth/google/login/success">get user data google</a></h2>            
                 <h2><a href="/api/auth/linkedin/login/success">get user data linkedin</a></h2>
                 <h2><a href="/api/auth/facebook/login/success">get user data facebook</a></h2>
              </div>
              <div style="background-color:#d47f79;color:#d47f79">
                 <h2><a href="/api/auth/google/logout">logout google</a></h2>
                 <h2><a href="/api/auth/linkedin/logout">logout linkedin</a></h2>
                 <h2><a href="/api/auth/facebook/logout">logout facebook</a></h2>
              </div>
              <div>
              </div>
            `)
   })
}
 
// await server.start();
// app.applyMiddleware({
//      path:'/api' 
// })
 
export const emitSocket = (info) =>{
 
}
 
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
 
  socket.on("setup", (userData) => {
    // console.log(userData)
    socket.join(userData._id);
    socket.emit("connected");
  });
 
  socket.emit("requestToDoctor", (obj) => {
    // // console.log(userData)
    // socket.join(userData._id);
    // socket.emit("connected");
  });
 
  // io.getIO().emit("requestToDoctor", {
            //     message: user $ { userId } sent an appointment request,
            //     data: obj,
            // });
 
// requestToDoctor
  socket.on('eventName', (data) => {
    console.log(data)
  });
 
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
 
  socket.on("start session",(room)=>{
    console.log("start session")
    console.log(room)
    socket.in(room).emit("start session",room)
    // socket.emit("start session")
  })
 
  socket.on("stop session",(room)=>{
    console.log("stop session")
    // socket.emit("stop session")
    socket.in(room).emit("stop session",room)
  })
 
  socket.on("typing", (room) => socket.in(room).emit("typing"));
 
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
 
  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;
 
    if (!chat.users) return console.log("chat.users not defined");
 
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
 
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
 
 
server.listen(port,()=>{
    mongoose
    .connect('mongodb+srv://haritiwari442:cVy46VtGieeCFEXd@cluster0.wbgnnv6.mongodb.net/dogswag').then(()=>{
        console.log("data base connected");
    })
  console.log(`app started at port ${port}`)
})
 
 
export {io}