import express from 'express'
const router = express.Router()
import { getCourse, getCourseById ,createCourseReview} from '../controllers/courseController.js'
import { protect  /*admin*/ } from '../middleware/authMiddleware.js'

router.route('/').get(getCourse)
router.route('/:id/reviews').post(protect , createCourseReview)
router.route('/:id').get(getCourseById)

export default router

