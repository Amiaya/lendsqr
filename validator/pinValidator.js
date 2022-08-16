const Joi = require('joi')

module.exports = Joi.object({
    pin: Joi.string().min(4).max(4).required()
})