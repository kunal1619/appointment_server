import express from "express";
// import requestController from '../Controller/request.js';
import timeRequest from "../Controller/timeRequest.js";
import { acc } from "../Controller/request.js";
import { rej } from "../Controller/request.js";
import { postReschedule } from "../Controller/request.js";

const router = express.Router();

router.post("/", timeRequest);
router.post("/acc", acc);
router.post("/rej", rej);

export default router;
