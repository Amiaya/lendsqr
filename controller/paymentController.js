const AppError = require('../utils/appError')
const {Account_statement} = require('../services/paymentService')


const {Payment} = require('../models')

exports.Account_statement = async (req,res,next) => {
    try {
        const Account = await Account_statement(req.user.id)
    
        res.status(200).json({
            status: "success",
            account_statement:{
                Account
            }
        })
    } catch (error) {
        next(error)
    }

}