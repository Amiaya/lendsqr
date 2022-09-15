const AppError = require('../utils/appError')
const {Account_statement} = require('../services/paymentService')




exports.Account_statement = async (req,res,next) => {
    try {
        const Account = await Account_statement(req.user[0].id)
    
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