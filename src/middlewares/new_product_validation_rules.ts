const { check, body } = require('express-validator');
export const newProductValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name is empty')
      .isLength({ min: 0, max: 500 })
      .withMessage('Name too long')
      .trim()
      .escape(),

    body('cpu')
      .notEmpty()
      .withMessage('Cpu is empty')
      .isLength({ min: 0, max: 500 })
      .withMessage('Cpu name too long')
      .trim()
      .escape(),

    body('memory')
      .notEmpty()
      .withMessage('Memory is empty')
      .isLength({ min: 0, max: 500 })
      .withMessage('Memory too long')
      .trim()
      .escape(),

    body('graphics')
      .notEmpty()
      .withMessage('Graphics is empty')
      .isLength({ min: 0, max: 500 })
      .withMessage('Graphics too long')
      .trim()
      .escape(),

    body('price')
      .notEmpty()
      .withMessage('Price is empty')
      .isLength({ min: 0, max: 500 })
      .withMessage('Price too long')
      .isNumeric()
      .withMessage('Price must be a number')
      .trim()
      .escape(),

    body('details')
      .isLength({ min: 0, max: 10000 })
      .withMessage('Details too long')
      .trim()
      .escape(),
  ]
}
