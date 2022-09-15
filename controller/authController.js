const db = require('../config/database')
const jwt = require('jsonwebtoken')
const sigupValidator = require('../validator/signupValidator')
const AppError = require('../utils/appError')
const loginValidator = require('../validator/loginValiddator')
const { promisify } = require('util')
const bycrpt = require('bcrypt')




const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createToken = async (user, statusCode, res) => {
    const token = signToken(user[0].id)
    user[0].password = undefined
    user[0].pin = undefined
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}
const generateNumber = () => {
    let result = ''
    let length = 10 // Customize the length here.
    for (let i = length; i > 0; --i) result += `${Math.floor(Math.random() * 10)}`

    return result

}
exports.signup = async (req, res, next) => {
    try {
        const value = await sigupValidator.validateAsync(req.body)
        const accountNo = generateNumber()
        value.password = await bycrpt.hash(value.password, 12)

        await db('users').insert({
            name: value.name,
            email: value.email,
            password: value.password,
            account_No: accountNo
        })
        const newUser = await db.select().from("users").where({ email: value.email })
        createToken(newUser, 201, res)
    } catch (error) {
        next(error)
    }

}

exports.login = async (req, res, next) => {
    try {
        const value = await loginValidator.validateAsync(req.body)
        if (!value.password || !value.email) {
            throw new AppError("Please provide an email and password", 400)
        }

        const user = await db.select().from('users').where({ email: value.email })

        if (!user || !await bycrpt.compare(value.password, user[0].password)) {
            throw new AppError('incorrect password or email', 401)
        }
        createToken(user, 200, res)
    } catch (error) {
        next(error)
    }

}

exports.protect = async (req, res, next) => {
    try {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            return next(new AppError('You are not login, Please login to get access', 401))
        }
        let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

        const currentUser = await db.select().from('users').where({ id: decoded.id })

        if (!currentUser) {
            return next(new AppError('The user belonging to this token, no longer exist', 401))
        }
        req.user = currentUser
        next()
    } catch (error) {
        next(error)
    }
}