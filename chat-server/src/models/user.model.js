import bcryptjs from 'bcryptjs'
import bcrypt from 'bcryptjs/dist/bcrypt'
import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required.']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required.']
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: {
      validator: function (email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      },
      message: (props) => `Email (${props.value}) is invalid!`
    }
  },
  password: {
    type: String
  },
  passwordConfirm: {
    type: String
  },
  passwordChangedAt: {
    type: Date
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  verified: {
    type: Boolean,
    default: false
  },
  otp:{
    type: Number
  },
  otp_expiry_time:{
    type: Date
  }
})

userSchema.pre('save', async function (next) {
  // Only run this fxn if OTP is actually modified
  if (!this.isModified('otp')) return next()

  // Hash the OTP with the cost of 12
  this.otp = await bcryptjs.hash(this.otp, 12)
  next()
})

userSchema.pre('save', async function (next) {
  // Only run this fxn if OTP is actually modified
  if (!this.isModified('password')) return next()

  // Hash the OTP with the cost of 12
  this.password = await bcryptjs.hash(this.password, 12)
  next()
})


userSchema.methods.correctPassword = async function (
  candidatePassword, // 12345
  userPassword // qakdbflsnjkkn
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.correctOTP = async function (
  candidateOTP, // 029232
  userOTP // hagsklkshsbwi
) {
  return await bcrypt.compare(candidateOTP, userOTP)
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetExpires = Date.now() + 10*60*1000 // 10 Minutes

  return resetToken
}

userSchema.methods.changedPasswordAfter = function (timestamp) {
  return timestamp < this.passwordChangedAt
}

const User = new mongoose.model('User', userSchema)
export default User

