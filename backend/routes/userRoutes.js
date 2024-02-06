import express from 'express'
const router = express.Router()
import { authUser , getAllUser, getUserProfile , registerUser , updateUserProfile} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getAllUser)
router.route('/').post(registerUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect , updateUserProfile)

export default router