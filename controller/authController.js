// external imports
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

// internal imports
const User = require('../models/People')

// user signup
const register = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({ ...req.body, password: hashedPassword })

        const result = await newUser.save()
        const { _id, name, username, email, phone } =  result
        res.status(201).json({ message: 'User registration successfull', user: { _id, name, username, email, phone } })
    } catch (error) {
        next(createError(500, "Internal Server Error!"))
    }
}

module.exports = {
    register
}