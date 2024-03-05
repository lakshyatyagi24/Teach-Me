import express from 'express'
const router = express.Router()
import { getSchedules, bookTimeSlot } from '../controllers/scheduleController.js'
import { protect  ,admin} from '../middleware/authMiddleware.js'

router.route('/:courseId/:teacherId').get(protect, admin, getSchedules);
router.route('/book').post(protect, bookTimeSlot);


export default router