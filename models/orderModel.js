const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    stripeSessionId : {type : String},
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
        price : {
            type : Number,
            required : true,
        },
        qty : {
            type : Number,
            required : true,
        }
        
    }],
    subtotal : {type : Number, required : true},
    total : {type : Number, required : true},
    shipping : {type : Object, required : true},
    delivery_status : {type : String, default : "pending"},
    payment_status : {type : String, required : true}
}, {timestamps : true})

const Order = mongoose.model("order", orderSchema)
module.exports = Order