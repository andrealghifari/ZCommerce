const { body } = require("express-validator");

const validateForm = [
  // Validate valueBilling fields if they exist
  body("valueBilling.firstName")
    .optional()
    .notEmpty()
    .withMessage("First Name is required"),
  body("valueBilling.lastName")
    .optional()
    .notEmpty()
    .withMessage("Last Name is required"),
  body("valueBilling.country")
    .optional()
    .notEmpty()
    .withMessage("Country is required"),
  body("valueBilling.street")
    .optional()
    .notEmpty()
    .withMessage("Street is required"),
  body("valueBilling.city")
    .optional()
    .notEmpty()
    .withMessage("City is required"),
  body("valueBilling.state")
    .optional()
    .notEmpty()
    .withMessage("State is required"),
  body("valueBilling.zipCode")
    .optional()
    .notEmpty()
    .withMessage("Zip code is required"),

  // Validate valueShipping fields if they exist
  body("valueShipping.firstName")
    .optional()
    .notEmpty()
    .withMessage("First Name is required"),
  body("valueShipping.lastName")
    .optional()
    .notEmpty()
    .withMessage("Last Name is required"),
  body("valueShipping.country")
    .optional()
    .notEmpty()
    .withMessage("Country is required"),
  body("valueShipping.street")
    .optional()
    .notEmpty()
    .withMessage("Street is required"),
  body("valueShipping.city")
    .optional()
    .notEmpty()
    .withMessage("City is required"),
  body("valueShipping.state")
    .optional()
    .notEmpty()
    .withMessage("State is required"),
  body("valueShipping.zipCode")
    .optional()
    .notEmpty()
    .withMessage("Zip code is required"),

  body("email").optional().notEmpty().withMessage("Email is required"),
  body("phoneNumber")
    .optional()
    .notEmpty()
    .withMessage("Phone number is required"),
];

module.exports = { validateForm };
