import express from 'express'
const router = express.Router()
import { authUser , getAllUser, getUserProfile , registerStudent, registerTeacher, registerUser , updateUserProfile ,getUsers} from '../controllers/userController.js'
import { protect  ,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getAllUser).get(protect,admin, getUsers)
router.route('/').post(registerUser)
router.route('/register/student').post(registerStudent);
router.route('/register/teacher').post(registerTeacher);
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect , updateUserProfile)

export default router