// external imports
const createError = require('http-errors')

// 404 not found 
const notFoundHandler = (req, res, next) => {
    next(createError(404, "Your requested content was not found!"))
}

// default error handler
const defaultErrorHandler = (err, req, res, next) => {
    res.locals.error = process.env.NODE_ENV === "development" ? err : { message: err.message }
    res.status(err.status || 500)
    res.json(res.locals.error)
}

module.exports = {
    notFoundHandler, defaultErrorHandler
}