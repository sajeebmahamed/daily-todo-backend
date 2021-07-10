// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/People");

// user login
const login = async (req, res, next) => {
   const { username, password } = req.body;
   try {
      const user = await User.findOne({
         $or: [
            { username: username },
            { email: username },
            { phone: username },
         ],
      });
      if (user && user._id) {
         const isValidPassword = await bcrypt.compare(password, user.password);

         if (isValidPassword) {
            // prepare the user object to generate token
            const userObject = {
               username: user.name,
               userId: user._id,
               phone: user.phone,
               email: user.email,
               role: user.role,
            };

            // generate token
            const token = jwt.sign(userObject, process.env.JWT_SECRET, {
               expiresIn: process.env.JWT_EXPIRY,
            });
            userObject.token = token;

            // set cookie
            // res.cookie(process.env.COOKIE_NAME, token, {
            //    maxAge: process.env.JWT_EXPIRY,
            //    httpOnly: true,
            //    signed: true,
            // });

            res.status(200).json({
               message: "User login successfull.",
               user: userObject,
            });
         } else {
            next(createError(500, "Wrong Crediential"));
         }
      } else {
         next(createError(500, "Wrong Crediential"));
      }
   } catch (error) {
      res.status(500).json({
         errors: {
            common: {
               message: error.message,
            },
         },
      });
   }
};

// user signup
const register = async (req, res, next) => {
   try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({ ...req.body, password: hashedPassword });

      const result = await newUser.save();
      const { _id, name, username, email, phone, role } = result;
      res.status(201).json({
         message: "User registration successfull",
         user: { _id, name, username, email, phone, role },
      });
   } catch (error) {
      next(createError(500, "Internal Server Error!"));
   }
};

module.exports = {
   register,
   login,
};
