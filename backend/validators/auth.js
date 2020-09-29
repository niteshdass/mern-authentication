const { check } = require('express-validator');

exports.userSignupValidator =[
      check('name')
            .not()
            .isEmpty()
            .withMessage("Name is Required"),
      check('email')
            .isEmail()
            .withMessage('Valid email is required'),
      check('password')
            .isLength({min:6})
            .withMessage("Password must be largest the 6 char")


]

exports.userSigninValidator =[
      check('email')
            .isEmail()
            .withMessage('Valid email is required'),
      check('password')
            .isLength({min:6})
            .withMessage("Password must be largest the 6 char")


]