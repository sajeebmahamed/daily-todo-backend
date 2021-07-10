// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

// internal imports
const User = require("../../models/People");

// register validation
const registerValidators = [
   check("name")
      .isLength({ min: 1 })
      .withMessage("Name is required!")
      .isAlpha("en-US", { ignore: " -" })
      .withMessage("Name must not contain anything other than alphabet")
      .trim(),
   check("username")
      .isLength({ min: 1 })
      .withMessage("User name is required!")
      .trim()
      .custom(async (value) => {
         try {
            const user = await User.findOne({ username: value });
            if (user) {
               throw createError("Username already taken!");
            }
         } catch (error) {
            throw createError(error.message);
         }
      }),
   check("email")
      .isLength({ min: 1 })
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Invalid email address")
      .trim()
      .custom(async (value) => {
         try {
            const user = await User.findOne({ email: value });
            if (user) {
               throw createError("Email already is used!");
            }
         } catch (error) {
            throw createError(error.message);
         }
      }),
   check("phone")
      // .isMobilePhone("bn-BD", {
      //    strictMode: true,
      // })
      // .withMessage("Mobile number must be a valid Bangladeshi mobile number")
      .isLength({ min: 1 })
      .withMessage("Phone is required!")
      .custom(async (value) => {
         try {
            const user = await User.findOne({ phone: value });
            if (user) {
               throw createError("Phone number already is used!");
            }
         } catch (err) {
            throw createError(err.message);
         }
      }),
   check("password")
      .isStrongPassword()
      .withMessage(
         "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
      ),
];

const registerValidatorsHandler = (req, res, next) => {
   try {
      const errors = validationResult(req);
      const mappedError = errors.mapped();
      if (Object.keys(mappedError).length === 0) {
         next();
      } else {
         res.status(500).json({
            errors: mappedError,
         });
      }
   } catch (error) {
      next(createError(500, error.message));
   }
};

// login validation
const loginValidators = [
   check("username")
      .isLength({ min: 1 })
      .withMessage("Username or email or phone is required!"),
   check("password").isLength({ min: 1 }).withMessage("Password is required!"),
];
const loginValidatorsResult = (req, res, next) => {
   try {
      const errors = validationResult(req);
      const mappedErrors = errors.mapped();

      if (Object.keys(mappedErrors).length === 0) {
         next();
      } else {
         res.status(500).json({
            errors: mappedErrors,
         });
      }
   } catch (error) {
      next(createError(500, error.message));
   }
};

module.exports = {
   registerValidators,
   registerValidatorsHandler,
   loginValidators,
   loginValidatorsResult,
};
