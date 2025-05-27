import { Router } from 'express'
import userController from '~/controllers/user.controller'
import authController from '~/controllers/auth.controller'

const router = Router()

// ghi đè các thông tin trong DB
router.patch('/update-me', authController.protect, userController.updateMe)


export default router
