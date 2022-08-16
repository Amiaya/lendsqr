const AppError = require('../utils/appError')
const {User} = require('../models')
const pinValidator = require('../validator/pinValidator')

const bankPin = async(user,value) => {
    const Pin = await pinValidator.validateAsync(value)
    console.log(Pin.pin)
    await user.hashPin(Pin.pin)
    await user.save()
}

module.exports = {
    bankPin
}