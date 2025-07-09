const { validationResult } = require("express-validator");
const Cart = require("../models/cartModel");
const Wishlist = require("../models/wishlistModel");

module.exports.getUserCart = async (req, res) => {
    try {
        const { _id } = req.user;
        const cart = await Cart.findOne({ userId: _id })
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports.createUserCart = async (req, res) => {
    try {
        const { _id } = req.user;
        const existingCart = await Cart.findOne({ userId: _id });
        if (existingCart) {
            return res.status(400).json({ message: "Cart already exists" })
        }
        let cart = await new Cart({
            userId: _id,
            items: []
        }).save()
        if (cart) {
            const existingWishlist = await Wishlist.findOne({ userId: _id });
            if (existingWishlist) {
                return res.status(200).json({ message: "Cart and Wishlist successfully Created" })
            }
            await new Wishlist({
                userId: _id,
                items: []
            }).save()
            return res.status(201).json({ message: "Cart and Wishlist successfully Created" })
        }
        return res.status(400).json({ message: "Error While Creating Cart" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports.addToCart = async (req, res) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.errors[0].msg })
        }
        const { _id } = req.user;
        const data = req.body;
        const result = await Cart.updateOne({ userId: _id, "items.productId": data.productId }, {
            $set: { "items.$.qty": data.qty }
        })

        if (result.modifiedCount !== 1) {
            const result = await Cart.updateOne({ userId: _id }, {
                $push: { items: data }
            })
            if (result.modifiedCount === 0) {
                return res.status(500).json({ message: "Item cannot be added to Cart." })
            }
        }

        const cart = await Cart.findOne({ userId: _id });
        return res.status(200).json(cart);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

/**
 * This function is responsible for removing an item from the cart and if it cann't be removed then it will send the error back to the front-end
 * @param {object} req 
 * @param {object} res 
 * @returns Sends response or error to the frontend based on the result of the database Query
 */
module.exports.deleteFromCart = async (req, res) => {
    try {
        const { _id } = req.user;
        const { productId } = req.params;
        const updatedCart = await Cart.updateOne({ userId: _id, "items.productId": productId }, {
            $pull: { items: { productId: productId } }
        }, { "items.$": 1 })
        if (updatedCart.modifiedCount !== 1) {
            return res.status(500).json({ message: "Item cannot be removed from Cart." })
        }
        let data = await Cart.findOne({ userId: _id });
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


module.exports.clearCart = async (req, res) => {
    try {
        const { _id } = req.user;
        const cart = await Cart.findOne({ userId: _id })
        if (cart.items.length === 0) {
            return res.status(200).json({ message: "Cart cleared successfully" })
        }

        cart.items = []
        let updatedCart = await cart.save()
        return res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}