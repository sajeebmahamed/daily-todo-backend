// external imports
const express = require('express')

// internal imports
const { register } = require('../controller/authController')

// define router interface
const router = express.Router()


// sign up router
router.post('/register', register) 

module.exports = router