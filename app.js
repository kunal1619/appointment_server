import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import requestRouter from "./Router/userRequest.js";
import timeSlotRouter from "./Router/timeSlotRouter.js";
// import cors from 'cors';
// import { init as initSocket } from './socket.js';
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});

// app.use(cors({
//   origin: 'http://localhost:8080',
//   credentials: true
// }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/request", requestRouter);
app.use("/slot", timeSlotRouter);

mongoose
  .connect(
    "mongodb+srv://haritiwari442:cVy46VtGieeCFEXd@cluster0.wbgnnv6.mongodb.net/dogswag"
  )
  .then((result) => {
    server.listen(8080);

    // const io = initSocket(server, { cors: { origin: '*' } });
    io.on("connect", (socket) => {
      console.log("connected");
    });
    console.log("server up and running");
  })
  .catch((err) => console.log(err));

export { io };
