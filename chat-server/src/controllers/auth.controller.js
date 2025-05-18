import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'

import User from '~/models/user.model'
import filterObj from '~/utils/FilterObj'


const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET)

// Register New User
exports.register = async (req, res, next) => {
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
}

// Send OTP
export const sendOTP = async (req, res, next) => {
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

  // TODO Send Mail
  res.status(200).json({
    status: 'success',
    message: 'OTP Sent Successfully!'
  })
}

export const verifyOTP = async (req, res, next) => {
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

}


// Login User
export const login = async (req, res, next) => {
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

}

export const forgotPassword = async (req, res, next) => {
//
}

export const resetPassword = async (req, res, next) => {
//
}
