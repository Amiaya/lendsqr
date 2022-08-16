const Joi = require('joi')

module.exports = Joi.object({
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required()
})