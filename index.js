
/**
 * Daily Todo v1 by Sajeeb Ahamed
 */

// external imports
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { notFoundHandler, defaultErrorHandler } = require('./middlewares/common/errorHandler')

// internal imports
const authRouter = require('./router/authRouter')
require('dotenv').config()

// db connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("db connection successfull"))
    .catch((err) => console.log(err))


// init app
const app = express()


// request parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// routing setup
app.use('/user', authRouter)

// 404 not found handler
app.use(notFoundHandler)
// default error handler
app.use(defaultErrorHandler)

app.listen(process.env.PORT, () => console.log(`Server is listening to the port ${process.env.PORT}`))

