const AppError = require('../utils/appError')
const {User} = require('../models')
const {Payment} = require('../models')

const Account_statement = async (value) => {
    const Account = await Payment.findAll({
        where: {user_id: value}
    })

    if(!Account){
        throw new AppError('This user have no history', 401)
    }
    return Account
}

module.exports ={
    Account_statement
}