const express = require('express')
const dotenv = require('dotenv')
const AppError = require('./utils/appError')
const userRouter = require('./routes/user')
const paymentRouter = require('./routes/payment')
const errorController = require('./utils/errorController')
const app = express()
dotenv.config()

app.use(express.json())
console.log(process.env.NODE_ENV)

app.use('/v1/lend', userRouter)
app.use('/v1/lend', paymentRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 400))
})

app.use(errorController)


module.exports = app