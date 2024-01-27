import express from 'express'
const router = express.Router()
import { getCourse, getCourseById } from '../controllers/courseController.js'


router.route('/').get(getCourse)
router.route('/:id').get(getCourseById)

export default router

