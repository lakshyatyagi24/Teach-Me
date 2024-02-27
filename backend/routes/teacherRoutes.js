import express from 'express'
const router = express.Router()
import { getAllTeachers , getTeacherById , registerTeacher  ,getTeachers} from '../controllers/teacherController.js'


router.route('/').get(getAllTeachers)
router.route('/:id').get(getTeacherById)
router.route('/').post(registerTeacher)
router.route('/').get(getTeachers)

export default router