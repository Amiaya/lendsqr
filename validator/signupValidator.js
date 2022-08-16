const Joi = require('joi')

module.exports = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required()
})