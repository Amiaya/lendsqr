const enviroment = process.env.NODE_ENV



module.exports = (err, req, res, next) => {
    const data = {
        status: "error",
        message: err.message
    }
    if (enviroment === 'development') {
        data.error = err.stack
    }

    if (!err.statusCode) {
        err.statusCode = 500
    }

    if (enviroment !== 'development' && err.status === 500) {
        data.message = "Something went very wrong"
    }
    console.log(err.message)
    res.status(err.statusCode).json(data);
}