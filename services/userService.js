const db = require('../config/database')
const AppError = require('../utils/appError')
const bycrpt = require('bcrypt')

const deposit = async (user, deposit) => {
    if (!deposit) {
        throw new AppError('please fill the deposit form', 400)
    }

    if (deposit < 1) {
        throw new AppError("You cannot deposit a negative number", 401)
    }
    user[0].balance += deposit

    await db('users').where({ id: user[0].id }).update({
        balance: user[0].balance
    })
    user[0].password = undefined
    user[0].pin = undefined

    await db('payments').insert({
        user_id: user[0].id,
        amount: deposit,
        description: "Deposit",
        balance: user[0].balance
    })
    return user
}



const withdrawal = async (user, withdrawal, pin) => {
    if (user[0].pin === null) {
        throw new AppError('Plesae create a pin', 401)
    }

    if (!await bycrpt.compare(pin, user[0].pin)) {
        throw new AppError('Please enter the correct pin to make a withdrawal', 401)
    }
    if (!withdrawal) {
        throw new AppError('please fill the withdrawal form', 400)
    }
    if (withdrawal > user[0].balance) {
        throw new AppError('insufficient balance', 401)
    }
    if (withdrawal < 0) {
        throw new AppError('You can not make a negative withdrawal', 401)
    }
    user[0].balance -= withdrawal


    await db('users').where({ id: user[0].id }).update({
        balance: user[0].balance
    })
    user[0].password = undefined
    user[0].pin = undefined

    await db('payments').insert({
        user_id: user[0].id,
        amount: withdrawal,
        description: "withdrawal",
        balance: user[0].balance
    })
    return user
}

const transfer = async (user, otherUser, amount, pin) => {
    if (user[0].pin === null) {
        throw new AppError('Plesae create a pin', 401)
    }
    if (!await bycrpt.compare(pin, user[0].pin)) {
        throw new AppError('Please enter the correct pin to make a withdrawal', 401)
    }
    if (!otherUser) {
        throw new AppError("This account number is not valid", 400)
    }

    if (!amount) {
        throw new AppError('please fill the transfer form', 400)
    }

    if (amount > user[0].balance) {
        throw new AppError('insufficient balance', 401)
    }

    if (amount < 0) {
        throw new AppError('You can not make a negative withdrawal', 401)
    }

    user[0].balance -= amount

    await db('users').where({ id: user[0].id }).update({
        balance: user[0].balance
    })
    user[0].password = undefined
    user[0].pin = undefined

    await db('payments').insert({
        user_id: user[0].id,
        amount: amount,
        description: "debit Transfer between two customers",
        balance: user[0].balance,
        from: user[0].name,
        to: otherUser[0].name
    })

    otherUser[0].balance += amount
    await db('users').where({ id: otherUser[0].id }).update({
        balance: otherUser[0].balance
    })

    await db('payments').insert({
        user_id: otherUser[0].id,
        amount: amount,
        description: "credit Transfer between two customers",
        balance: user[0].balance,
        from: otherUser[0].name,
        to: user[0].name
    })
    return user
}

const GetAllUser = async () => {
    const users = await db.select('name', 'email', 'balance').from('users')
    return users
}

const deleteAllUser = async () => {
    await db('users').del()
}
module.exports = {
    deposit,
    withdrawal,
    transfer,
    GetAllUser,
    deleteAllUser
}