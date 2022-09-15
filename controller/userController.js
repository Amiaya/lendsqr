const AppError = require('../utils/appError')
const db = require('../config/database')
const { deposit, withdrawal, transfer, GetAllUser, deleteAllUser } = require('../services/userService')
const { bankPin } = require('../services/pinService')



exports.getUser = async (req, res, next) => {
    try {
        const user = req.user
        user.Password = undefined
        user.Pin = undefined
        res.status(200).json({
            status: "successful",
            data: {
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.createPin = async (req, res, next) => {
    try {
        await bankPin(req.user, req.body)
        res.status(201).json({
            status: "successful",
            message: "Pin has been created"
        })
    } catch (error) {
        next(error)
    }
}


exports.deposit = async (req, res, next) => {
    try {
        const user = await deposit(req.user, req.body.deposit)
        res.status(200).json({
            status: "successful",
            data: {
                user
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.withdraw = async (req, res, next) => {
    try {
        const user = await withdrawal(req.user, req.body.withdrawal, req.body.pin)
        res.status(200).json({
            status: "successful",
            data: {
                user
            }
        })
    } catch (error) {
        next(error)
    }

}

exports.transfer = async (req, res, next) => {
    try {
        const accountNo = req.body.acct_no
        const otherUser = await db.select().from('users').where({ account_no: accountNo })
        // console.log(otherUser)
        const user = await transfer(req.user, otherUser, req.body.amount, req.body.pin)

        res.status(200).json({
            status: "successful",
            data: {
                user
            }
        })
    } catch (error) {
        next(error)
    }

}

exports.AllUser = async (req, res, next) => {
    try {
        const users = await GetAllUser()
        res.status(200).json({
            status: "successful",
            data: {
                users
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        await deleteAllUser()
        res.status(204).json({
            status: "successful",
            message: "All users have been deleted"
        })
    } catch (error) {
        next(error)
    }
}