import { Router } from 'express'
import authController from '~/controllers/auth.controller'

const router = Router()

router.post('/login', authController.login)
router.post('/register', authController.register, authController.sendOTP)
router.post('/send-otp', authController.sendOTP)
router.post('/verify', authController.verifyOTP)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)

export default router
