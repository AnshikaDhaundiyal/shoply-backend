const express = require("express");
const {
  getUserCart,
  createUserCart,
  addToCart,
  deleteFromCart,
  clearCart,
} = require("../controllers/cartController");
const { verifyUser } = require("../middlewares/authMiddleware");
const { check } = require("express-validator");

const router = express.Router();

const cartValidation = [
  check("productId").notEmpty().withMessage("Product Id is required"),
  check("productName").notEmpty().withMessage("Product Name is Required"),
  check("productImage").notEmpty().withMessage("Product Image is Required"),
  check("countInStock").notEmpty().withMessage("Count is stock is Required").custom(value => typeof value === "number" ? true : false ).withMessage("Count in stock should be of number type"),
  check("price").notEmpty().withMessage("Price is Required").custom(value => typeof value === "number" ? true : false ).withMessage("Price should be of number type"),
  check("qty").notEmpty().withMessage("Quantity is Required").custom(value => typeof value === "number" ? true : false ).withMessage("Quantity should be of number type"),
];

router.get("/", verifyUser, getUserCart);
router.post("/createCart", verifyUser, createUserCart);
router.put("/addToCart", verifyUser, cartValidation, addToCart);
router.put("/delete/:productId", verifyUser, deleteFromCart);
router.put("/clearCart", verifyUser, clearCart);

module.exports = router;
