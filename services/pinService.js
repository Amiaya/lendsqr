const AppError = require('../utils/appError')
const bycrpt = require('bcrypt')
const db = require('../config/database')
const pinValidator = require('../validator/pinValidator')
var User
const bankPin = async (user, value) => {
    const Pin = await pinValidator.validateAsync(value)
    const pin = await bycrpt.hash(Pin.pin, 12)
    await db("users").where({ id: user[0].id }).update({
        pin: pin
    })
}

module.exports = {
    bankPin
}