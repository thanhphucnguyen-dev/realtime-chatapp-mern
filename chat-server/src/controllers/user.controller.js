import User from '~/models/user.model'
import filterObj from '~/utils/FilterObj'

const userController = {
  updateMe: async (req, res, next) => {
    const { user } = req

    const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'about', 'avatar')

    const updated_user = await User.findByIdAndUpdate(user._id, filteredBody, {
      new: true,
      validateModifiedOnly: true
    })

    res.status(200).json({
      status: 'success',
      data: updated_user,
      message: 'Profile Updated successfully!'
    })

  }
}

export default userController
