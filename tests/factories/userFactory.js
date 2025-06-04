const mongoose = require('mongoose')
const UserModel = mongoose.model('User')

module.exports = () => {
  return new UserModel({}).save()
}
