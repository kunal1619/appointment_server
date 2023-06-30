import express from "express";
import requestSchema from "../Models/request.js";
import rescheduleSchema from "../Models/reschedule.js";
// import { getIO } from '../socket.js';
import mongoose from "mongoose";
import { io } from "../app.js";

const postRequest = (req, res, next) => {
  const userId = req.body.docId;
  const docId = req.body.userId;
  const timeStamp = req.body.timeStamp;

  const newRequest = new requestSchema({
    userId: userId,
    timeStamp: timeStamp,
    docId: docId,
  });
  newRequest
    .save()
    .then((obj) => {
      io.emit("requestToDoctor", {
        message: `user ${userId} sent an appointment request`,
        data: obj,
      });
      res.status(200).json({ message: "User Successfully created!" });
    })
    .catch((err) => console.log(err));
};

const getAccepted = (req, res, next) => {
  const reqId = req.body.reqId;
  const timeStamp = req.body.timeStamp;

  // We need to emit this request on a specific socket id
  io.emit("isAccepted", {
    message: "Accepted",
    timeStamp: timeStamp,
  });
};

const getRejected = (req, res, next) => {
  const reqId = req.body.reqId;
  const timeStamp = req.body.timeStamp;
  // We need to emit this request on a specific socket id
  io.emit("isRejected", {
    message: "Rejected",
    timeStamp: timeStamp,
  });
};

const postReschedule = (req, res, next) => {
  const reqId = req.body.reqId;
  const docId = req.body.docId;
  const userId = req.body.userId;
  const newTimeStamp = req.body.timeStamp;
  const updatedTime = req.body.updatedTimeSlot;
  requestSchema
    .deleteOne({ _id: new mongoose.Types.ObjectId(reqId) })
    .then(() => {
      console.log("Successfully destroyed!");
      res.status(200).json({ message: "Successfully done!" });
    })
    .catch((err) => console.log(err));

  const newReschedule = new rescheduleSchema({
    docId: docId,
    userId: userId,
    timeStamp: newTimeStamp,
  });
  newReschedule
    .save()
    .then((obj) => {
      io.emit("reScheduledTouser", {
        message: "Doctor has been rescheduled meet",
        data: obj,
        updatedTimeSlot: updatedTime,
        timeStamp: newTimeStamp,
      });
      console.log("Rescheduled successfully!");
    })
    .catch((err) => console.log(err));
};

const acc = (req, res, next) => {
  const obj = req.body.obj;
  io.emit("au", {
    message: "accepted",
    obj : obj,
  });
  res.status(200).json({ message: "accepted by user" });
};
const rej = (req, res, next) => {
  const obj = req.body.obj;
  io.emit("ru", {
    message: "rejected",
    obj : obj,
  });
  res.status(200).json({ message: "Rejected by user" });
};

export default postRequest;
export { getAccepted, getRejected, postReschedule, acc, rej };
