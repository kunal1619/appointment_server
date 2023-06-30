import express from "express";
import { io } from "../app.js";
const timeRequest = (req, res, next) => {
  const slot = req.body.timeSlot;
  const array = req.body.array;
  io.emit("timeSlot", {
    dataArray: array,
  });
  res.status(200).json({ message: "everything is okay" });
};
export default timeRequest;
