const { validationResult } = require("express-validator");
const checkFunction = async (req, res) => {
  return res
    .status(200)
    .send({
      success: true,
      message: "Received  your request",
      data: req.body.data,
    });
};
const validationCheckers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      success: false,
      message: "Validation Form Error",
      error: errors.array(),
    });
  }
  return res.status(200).send({
    success: true,
    data: {
      valueBilling: req.body.valueBilling,
      valueShipping: req.body.valueShipping,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    },
  
  });
};

module.exports = { validationCheckers, checkFunction };
