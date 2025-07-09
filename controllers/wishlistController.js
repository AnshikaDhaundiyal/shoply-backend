const { validationResult } = require("express-validator");
const Wishlist = require("../models/wishlistModel")

module.exports.getUserWishlist = async (req, res) => {
    try {
        const { _id } = req.user;
        const wishlist = await Wishlist.findOne({ userId: _id })
        res.status(200).json(wishlist)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports.createUserWishlist = async (req, res) => {
    try {
        const { _id } = req.user;
        const existingWishlist = await Wishlist.findOne({ userId: _id });
        if (existingWishlist) {
            return res.status(400).json({ message: "Wishlist already exists" })
        }
        await Wishlist({
            userId: _id,
            items: []
        }).save()
        return res.status(201).json({ message: "Wishlist successfully Created" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports.addToWishlist = async (req, res) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.errors[0].msg })
        }
        const { _id } = req.user;
        const data = req.body;
        const existingProductInWishlist = await Wishlist.findOne({ userId: _id, "items.productId": data.productId })
        if (existingProductInWishlist) {
            return res.status(200).json({
                existingProductInWishlist
            })
        }
        // if(result.modifiedCount !== 1){
        const result = await Wishlist.updateOne({ userId: _id }, {
            $push: { items: data }
        })
        if (result.modifiedCount === 0) {
            return res.status(500).json({ message: "Item cannot be added to Wishlist." })
        }
        // }

        const wishlist = await Wishlist.findOne({ userId: _id });
        return res.status(200).json(wishlist);

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
module.exports.deleteFromWishlist = async (req, res) => {
    try {
        const { _id } = req.user;
        const { productId } = req.params;
        const updatedWishlist = await Wishlist.updateOne({ userId: _id, "items.productId": productId }, {
            $pull: { items: { productId: productId } }
        }, { "items.$": 1 })
        if (updatedWishlist.modifiedCount !== 1) {
            return res.status(500).json({ message: "Item cannot be removed from Wishlist." })
        }
        let data = await Wishlist.findOne({ userId: _id });
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


module.exports.clearWishlist = async (req, res) => {
    try {
        const { _id } = req.user;
        const wishlist = await Wishlist.findOne({ userId: _id })
        if (wishlist.items.length === 0) {
            return res.status(200).json({ message: "Wishlist cleared successfully" })
        }

        wishlist.items = []
        let updatedWishlist = await wishlist.save()
        return res.status(200).json(updatedWishlist)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}