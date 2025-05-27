import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'
import crypto from 'crypto'

import User from '~/models/user.model'
import filterObj from '~/utils/FilterObj'
import { sendEmail as mailService } from '~/services/mailer'

import { promisify } from 'util'

const authController = {

  signToken: (userId) => jwt.sign({ userId }, process.env.JWT_SECRET),

  // Signup => register - sendOTP - verifyOTP
  // https://api.zenya.com/auth/register

  // Register New User
  register: async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body

    const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'password', 'email')

    // Check if a verified user with given email exists
    const existing_user = await User.findOne({ email: email })

    if (existing_user && existing_user.verified) {
      res.status(400).json({
        status: 'error',
        message: 'Email already in use, Please login.'
      })
    } else if (existing_user) {
      await User.findOneAndUpdate({ email: email }, filteredBody, { new: true, validateModifiedOnly: true })

      // Generate an otp and send to email
      req.userId = existing_user._id
      res.status(200).json({
        status: 'success',
        message: 'User updated successfully.'
      })
      next()

    } else {
    // If user record is not available in DB
      const new_user = await User.create(filteredBody)
      // Generate an otp and send to email
      req.userId = new_user._id
      res.status(200).json({
        status: 'success',
        message: 'User created successfully.'
      })
      next()
    }
  },

  // Send OTP
  sendOTP: async (req, res) => {
    const { userId } = req
    const new_otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    })
    // Verify OTP
    const otp_expiry_time = Date.now() + 10 * 60 * 1000 // 10 Mins after otp is sent

    await User.findByIdAndUpdate(userId, {
      otp: new_otp,
      otp_expiry_time
    })

    // Send Mail
    mailService.sendEmail({
      from: 'contact@zenya.com',
      to: 'example@gmail.com',
      subject: 'OTP for Zenya',
      text: `Your  OTP is ${new_otp}. This is valid for 10 minutes.`
    })

    res.status(200).json({
      status: 'success',
      message: 'OTP Sent Successfully!'
    })
  },

  // verifyOTP
  verifyOTP: async (req, res) => {
  // Verify OTP and update user record accordingly
    const { email, otp } = req.body

    const user = await User.findOne({
      email,
      otp_expiry_time: { $gt: Date.now() }
    })

    if (!user) {
      res.status(400).json({
        status: 'error',
        message: 'Email is Invalid or OTP expired'
      })
    }

    if (!await user.correctOTP(otp, user.otp)) {
      res.status(400).json({
        status: 'error',
        message: 'OTP is incorrect'
      })
    }

    // OTP is correct
    user.verified = true
    user.otp = undefined

    await user.save({ new: true, validateModifiedOnly: true })

    const token = signToken(user._id)

    res.status(200).json({
      status: 'success',
      message: 'OTP verified successfully!',
      token
    })

  },

  // Login User
  login: async (req, res) => {
    const { email, password } = req.body

    if ( !email || !password ) {
      res.status(400).json({
        status: 'error',
        message: 'Both email and password are required.'
      })
    }

    const userDoc = await User.findOne({ email: email }).select('+password')

    if (!userDoc || !(await userDoc.correctPassword(password, userDoc.password))) {
      res.status(400).json({
        status: 'error',
        message: 'Email or password is incorrect.'
      })
    }

    const token = signToken(userDoc._id)

    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully!',
      token
    })

  },

  // protect
  protect: async (req, res, next) => {
  //1) Getting token (JWT) and check if it's there
    let token
    // 'Bear kajkkaulieqjki8199100101'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]


    } else if (req.cookies.jwt) {
      token = req.cookies.jwt
    } else {
      req.status(400).json({
        status: 'error',
        message: 'You are not logged In! Please login to get access.'
      })
      return
    }

    // 2) Verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3) Check if user still exist
    const this_user = await User.findById(decoded.userId)

    if (!this_user) {
      res.status(400).json({
        status: 'error',
        message: 'The user dosen\'t exist.'
      })
    }

    // 4) check if user changed their password after token was issued
    if (this_user.changedPasswordAfter(decoded.iat)) {
      res.status(400).json({
        status: 'error',
        message: 'User recently updated password! Please log in again.'
      })
    }

    //
    req.user = this_user
    next()
  },

  // Types of routes => Protected (Only logged in users an access these) & Unprotected

  // forgotPassword
  forgotPassword: async (req, res) => {
  // 1) Get users email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      res.status(400).json({
        status: 'error',
        message: 'There is no user with given email address.'
      })
      return
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken()
    const resetURL = `https://zenya.com/auth/reset-password?code=${resetToken}`
    try {
    // TODO => Send Email With Reset URL
      res.status(200).json({
        status: 'success',
        message: 'Reset Password link sent to Email!'
      })
    } catch (error) {
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined

      await user.save({ validateBeforeSave: false })

      res.status(500).json({
        status: 'error',
        message: 'There was an error sending the email, Please try again later.'
      })

    }
  },

  // resetPassword
  resetPassword: async (req, res) => {
  //1) Get user based on  token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    })

    // 2) If token has expired or submission is out of time window
    if (!user) {
      res.status(400).json({
        status: 'error',
        message: 'Token is Invalid or Expired.'
      })
      return
    }

    // 3) Update users password and set resetToken & expiry to undifine
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

    // 4) Log in the user and Send new JWT
    //TODO => Send an email to user informing about password

    const token = signToken(user._id)
    res.status(200).json({
      status: 'success',
      message: 'Password reseted successfully!',
      token
    })
  }
}

export default authController
