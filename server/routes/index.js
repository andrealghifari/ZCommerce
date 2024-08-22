const express = require("express");
const router = express.Router();
const { validateForm } = require("../utility/validators/AddressForm");
const { validationCheckers, checkFunction } = require("../controllers/CheckoutController");

router.get("/hello", (req, res) => {
    return res.send("This is Hello Endpoint");
})
router.post("/validate/checkout", validateForm, validationCheckers);
router.post("/check/checkout", checkFunction);
module.exports = router;
