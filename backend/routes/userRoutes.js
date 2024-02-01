import express from 'express'
const router = express.Router()
import { authUser , getAllUser, getUserProfile , registerUser} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getAllUser)
router.route('/').post(registerUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile)

export default router