import bcrypt from 'bcryptjs'
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
  about: {
    type: String
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
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
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date
  },
  verified: {
    type: Boolean,
    default: false
  },
  otp:{
    type: String
  },
  otp_expiry_time:{
    type: Date
  }
})

userSchema.pre('save', async function (next) {
  // 1. Hash OTP nếu được sửa
  if (this.isModified('otp') && this.otp) {
    this.otp = await bcrypt.hash(this.otp.toString(), 12)
    console.log(this.otp.toString(), 'FROM PRE SAVE HOOK (OTP)')
  }

  // 2. Hash password nếu được sửa
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordChangedAt = Date.now() - 1000
  }

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

// userSchema.methods.changedPasswordAfter = function (timestamp) {
//   return timestamp < this.passwordChangedAt
// }

const User = new mongoose.model('User', userSchema)
export default User

