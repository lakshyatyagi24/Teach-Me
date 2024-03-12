import express from 'express'
const router = express.Router()
import { getCourse, getCourseById ,createCourseReview ,updateCourse , createCourse ,deleteCourse  , getCoursesForTeacher} from '../controllers/courseController.js'
import { protect , admin } from '../middleware/authMiddleware.js'

router.route('/').get(getCourse).post(protect ,admin, createCourse)
router.route('/:id/reviews').post(protect , createCourseReview)
router.route('/:id').get(getCourseById).put(protect , admin, updateCourse).delete(protect , admin, deleteCourse)
router.route('/teacher/courses').get(protect, getCoursesForTeacher)


export default router