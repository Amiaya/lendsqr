const AppError = require('../utils/appError')
const db = require('../config/database')


const Account_statement = async (value) => {
    const Account = await db.select().from('payments').where({
        user_id: value
    })

    if (!Account) {
        throw new AppError('This user have no history', 401)
    }
    return Account
}

module.exports = {
    Account_statement
}