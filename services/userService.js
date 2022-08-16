const AppError = require('../utils/appError')
const {User} = require('../models')
const {Payment} = require('../models')


const deposit = async(user, deposit) => {
    if(!deposit){
        throw new AppError('please fill the deposit form', 400)
    }
    
    if(deposit < 1){
        throw new AppError("You cannot deposit a negative number", 401)
    }
    user.Balance += deposit
    
    await user.save()
    user.Password = undefined
    user.Pin = undefined

    await Payment.create({
        user_id: user.id,
        amount: deposit,
        description: "Deposit",
        balance: user.Balance
    })

    return user
}



const withdrawal = async(user, withdrawal, pin)=> {
    if(user.Pin === null ){
        throw new AppError('Plesae create a pin', 401)
    }
    console.log(!await user.correctPin(pin))
    if(!await user.correctPin(pin)){
        throw new AppError('Please enter the correct pin to make a withdrawal', 401)
    }
    if(!withdrawal){
        throw new AppError('please fill the withdrawal form', 400)
    }
    if(withdrawal > user.Balance) {
        throw new AppError('insufficient balance', 401)
    }
    if(withdrawal < 0){
        throw new AppError('You can not make a negative withdrawal', 401)
    }
    user.Balance -= withdrawal
    

    await user.save()
    user.Password = undefined
    user.Pin = undefined

    await Payment.create({
        user_id: user.id,
        amount: withdrawal,
        description: "withdrawal",
        balance: user.Balance
    })
    return user
}

const transfer = async (user, otherUser, amount, pin) =>{
    if(user.Pin === null ){
        throw new AppError('Plesae create a pin', 401)
    }
    if(!await user.correctPin(pin)){
        throw new AppError('Please enter the correct pin to make a withdrawal', 401)
    }
    if(!otherUser){
        throw new AppError("This account number is not valid", 400)
    }
    
    if(!amount){
        throw new AppError('please fill the transfer form', 400)
    }

    if (amount > user.Balance){
        throw new AppError('insufficient balance', 401)
    }

    if(amount < 0){
        throw new AppError('You can not make a negative withdrawal', 401)
    }

    user.Balance -= amount

    await user.save()
    user.Password = undefined
    user.Pin = undefined

    await Payment.create({
        user_id: user.id,
        amount: amount,
        description: "debit Transfer between two customers",
        balance: user.Balance,
        from: user.Name,
        to: otherUser.Name
    })

    otherUser.Balance += amount
    await otherUser.save()

    await Payment.create({
        user_id: otherUser.id,
        amount: amount,
        description: "credit Transfer between two customers",
        balance: user.Balance,
        from: otherUser.Name,
        to: user.Name
    })
    return user
}

const GetAllUser = async () => {
    const users = await User.findAll()
    return users
}
module.exports = {
    deposit,
    withdrawal,
    transfer,
    GetAllUser
}