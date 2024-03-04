import express from 'express'
const router = express.Router()
import { getAllTeachers , getTeacherById , registerTeacher  ,getTeachers} from '../controllers/teacherController.js'


router.route('/').get(getAllTeachers)
router.route('/:id').get(getTeachers)
router.route('/').post(registerTeacher)

export default router