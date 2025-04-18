import express from 'express';
import {
  createApplication,
  readApplication,
  deleteApplication,
  updateApplication,
  relaunchApplication,
  getStats
} from '../controllers/applicationControllers.js';

const router = express.Router();

router.post('/add', createApplication);       
router.get('/get', readApplication);         
router.delete('/delete/:id', deleteApplication); 
router.put('/update/:id', updateApplication);
router.get('/relaunches', relaunchApplication); 
router.get('/stats', getStats); 

export default router;