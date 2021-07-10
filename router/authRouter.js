// external imports
const express = require("express");

// internal imports
const { register, login } = require("../controller/authController");
const {
   registerValidators,
   registerValidatorsHandler,
   loginValidators,
   loginValidatorsResult,
} = require("../middlewares/validation/userValidation");
// define router interface
const router = express.Router();

// login
router.post("/login", loginValidators, loginValidatorsResult, login);

// register
router.post(
   "/register",
   registerValidators,
   registerValidatorsHandler,
   register
);

module.exports = router;
