const experss = require("express");
const { check } = require("express-validator");
const { placeOrder, getAllOrder } = require("../controllers/orderController");
const { verifyUser, verifyAdmin } = require("../middlewares/authMiddleware");

const router = experss.Router();

// const orderValidation = [
  // check("userId").notEmpty().withMessage("User Id is Required"),
  // check("total")
  //   .custom((value) => typeof value === "number" && !isNaN(value))
  //   .withMessage("Total should be of number type")
  //   .notEmpty()
  //   .withMessage("Total is Required"),
  // check("subtotal")
  //   .custom((value) => typeof value === "number" && !isNaN(value))
  //   .withMessage("Sub Total should be of number type")
  //   .notEmpty()
  //   .withMessage("Sub Total is Required"),
  // check("items")
  //   .isArray()
  //   .withMessage("Items should be of type Array")
  //   .notEmpty()
  //   .withMessage("Items Array is Required"),
  // check("payment_status").notEmpty().withMessage("Payment Status is Required"),
  // check("shipping")
  //   .isObject()
  //   .withMessage("Shipping Address should be of type Object")
  //   .notEmpty()
  //   .withMessage("Shipping Address is Required"),
// ];

router.post("/create", verifyUser, placeOrder);
router.get("/", verifyUser, verifyAdmin, getAllOrder);

module.exports = router;
