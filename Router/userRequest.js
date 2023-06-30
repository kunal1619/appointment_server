import express from 'express';
// import requestController from '../Controller/request.js';
import  postRequest  from '../Controller/request.js';
import { getAccepted } from '../Controller/request.js';
import { getRejected } from '../Controller/request.js';
import { postReschedule } from '../Controller/request.js';

const router = express.Router();

router.post('/', postRequest);
router.post('/accepted', getAccepted);
router.post('/rejected', getRejected);
router.post('/reschedule', postReschedule);

export default router;

