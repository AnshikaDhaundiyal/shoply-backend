// import express from 'express';
const express = require('express');
const {getAllProducts, createProduct, getSingleProduct, addReview, updateProduct, deleteProduct} = require("../controllers/productControllers");
const { verifyAdmin, verifyUser } = require('../middlewares/authMiddleware');
const {check} = require("express-validator")
const router = express.Router();

const productValidation = [
    check('name').notEmpty().withMessage("Product Name is Required").trim(),
    check('image').notEmpty().withMessage("Product Image is Required").trim(),
    check('brand').notEmpty().withMessage("Product Brand is Required").trim(),
    check('description').notEmpty().withMessage("Product Description is Required").trim(),
    check('category').notEmpty().withMessage("Product Category is Required").trim(),
    check('price').notEmpty().withMessage("Product Price is Required").custom(value => typeof value === "number" && !isNaN(value) ? true : false).withMessage("Price should be of number type"),
    check('countInStock').notEmpty().withMessage("Product Count in Stock is Required").custom(value => typeof value === "number" && !isNaN(value) ? true : false).withMessage("Count in Stock should be of number type"),
]

const reviewValidation = [
    check("message").notEmpty().withMessage("Message is required").isLength({
        min : 10,
        max : 80
    }).withMessage("Message should be greater than 20 and less than 80"),
    check("rating").notEmpty().withMessage("Rating is required").custom(value => typeof value === "number" && !isNaN(value) ? true : false).withMessage("Rating should be of number type")
]

router.get("/", getAllProducts)
router.get("/:_id", getSingleProduct)
router.post("/create",verifyUser, verifyAdmin, productValidation,  createProduct)
router.put("/update/:productId",verifyUser, verifyAdmin, productValidation,  updateProduct)
router.delete("/delete/:productId",verifyUser, verifyAdmin,  deleteProduct)
router.put("/addReview/:productId",verifyUser, reviewValidation,  addReview)

module.exports = router
module.exports = router