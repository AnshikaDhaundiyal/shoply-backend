const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    items : [{
        productId : {
            type :mongoose.Schema.Types.ObjectId,
            required : true ,
            trim : true
        },
        productImage : {
            type : String,
            required : true,
            trim : true

        },
        productName : {
            type : String,
            required : true,
            trim : true

        },
        countInStock : {
            type : Number,
            required : true,
            min  : 1,
            maxLength: 4 
        },
        price : {
            type : Number,
            required : true,
        },
        qty : {
            type : Number,
            required : true,
        }
    }]
}, {
    timestamps : true
})

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;