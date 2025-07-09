const express = require("express");
const {
    getUserWishlist,
    addToWishlist,
    clearWishlist,
    deleteFromWishlist
} = require("../controllers/wishlistController");
const { verifyUser } = require("../middlewares/authMiddleware");
const { check } = require("express-validator");

const router = express.Router();

const wishlistValidation = [
    check("productId").notEmpty().withMessage("Product Id is required"),
    check("productName").notEmpty().withMessage("Product Name is Required"),
    check("productImage").notEmpty().withMessage("Product Image is Required"),
    check("price").notEmpty().withMessage("Price is Required").custom(value => typeof value === "number" ? true : false).withMessage("Price should be of number type"),
    check("countInStock").notEmpty().withMessage("Count is stock is Required").custom(value => typeof value === "number" ? true : false).withMessage("Count in stock should be of number type"),
];

router.get("/", verifyUser, getUserWishlist);
// router.post("/createCart", verifyUser, createUserCart);
router.put("/addToWishlist", verifyUser, wishlistValidation, addToWishlist);
router.put("/delete/:productId", verifyUser, deleteFromWishlist);
router.put("/clearWishlist", verifyUser, clearWishlist);

module.exports = router;