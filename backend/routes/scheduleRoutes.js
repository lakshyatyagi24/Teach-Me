import express from 'express'
const router = express.Router()
import { getSchedules, bookTimeSlot , addSchedule , updateSchedules } from '../controllers/scheduleController.js'
import { protect  ,admin} from '../middleware/authMiddleware.js'

router.route('/:courseId/:teacherId').get(protect,getSchedules);
router.route('/book').post(protect,bookTimeSlot);
router.route('/add').post(protect, addSchedule);
router.route('/update').put(protect,updateSchedules);


export default router