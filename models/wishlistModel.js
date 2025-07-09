const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true
        },
        productImage: {
            type: String,
            required: true,
            trim: true

        },
        productName: {
            type: String,
            required: true,
            trim: true

        },
        price: {
            type: Number,
            required: true,
        },
        countInStock: {
            type: Number,
            required: true,
            min: 1,
            maxLength: 4
        },
    }]
}, {
    timestamps: true
})

const Wishlist = mongoose.model("wishlist", wishlistSchema);

module.exports = Wishlist;