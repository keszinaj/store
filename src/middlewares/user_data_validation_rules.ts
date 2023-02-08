const { check, body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
    
     body('password')
    .notEmpty()
    .withMessage('Password is empty')
    .isLength({ min: 5, max: 50 })
    .withMessage('Password is too short or too long. Min. 6 chars. Max 50 chars')
    .matches(/\d/)
    .withMessage('Password must contain a number.')
    .matches(/(.*[A-Z].*)/ || /(.*[a-z].*)/)
    .withMessage('Password must contail an uppercase and lowercase letter.')
    .matches(/(?=.*\W)/)
    .withMessage('Passwords must have one special character'),

    body("emailAddress")
    .notEmpty()
    .withMessage('Email is empty')
    .isLength({ max: 500 })
    .withMessage('Email too long')
    .isEmail()
    .withMessage("Provide valid email")
    .trim()
    .escape(),
    //sprawdz czy email juz istnieje w bazie danych
   // .custom(value => {
   //     return User.findUserByEmail(value).then(user => {
   //       if (user) {
    //        return Promise.reject('E-mail already in use');
    //      }
   //     })
        
    body("firstName")
    .notEmpty()
    .withMessage('Name is empty')
    .isLength({ max: 500 })
    .withMessage('Name too long')
    .trim()
    .escape(),

    body("lastName")
    .notEmpty()
    .withMessage('Surname is empty')
    .isLength({ max: 500 })
    .withMessage('Surname too long')
    .trim()
    .escape(),

    check("phoneNumber")
    .notEmpty()
    .withMessage('Phone number is empty')
    .isLength({ max: 500 })
    .withMessage('Phone number too long')
    .trim()
    .escape(),

    check("birthdayDate")
    .notEmpty()
    .withMessage('Birthdat is empty')
    .isLength({ max: 500 })
    .withMessage('Birthday too long')
    .isDate()
    .withMessage("Birthday should be valid date")
    .trim()
    .escape(),

    check("city").notEmpty()
    .withMessage('City is empty')
    .isLength({ max: 500 })
    .withMessage('City too long')
    .trim()
    .escape(),

    check("country")
    .notEmpty()
    .withMessage('Country is empty')
    .isLength({ max: 500 })
    .withMessage('Country too long')
    .trim()
    .escape(),

    check("zipcode")
    .notEmpty()
    .withMessage('ZipCode is empty')
    .isLength({ max: 500 })
    .withMessage('ZipCode too long')
    .trim()
    .escape(),

    check("gender")
    .notEmpty()
    .withMessage('Gender is empty')
    .isLength({ max: 500 })
    .withMessage('Gender too long')
    .trim()
    .escape(),

    check("street_and_num")
    .notEmpty()
    .withMessage('Street and number is empty')
    .isLength({ max: 500 })
    .withMessage('Street and number too long')
    .trim()
    .escape(),

    ]}