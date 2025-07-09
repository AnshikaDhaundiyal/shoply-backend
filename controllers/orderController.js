const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

module.exports.placeOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const data = req.body;
    let items = await Promise.all(
      data.items.map(async (item) => {
        let product = await Product.findById(item.productId);
        return {
          productId: product._id,
          productImage: product.image,
          productName: product.name,
          price: product.price,
          qty: item.qty,
        };
      })
    );
    let subtotal = items.reduce((st, item) => st + item.price * item.qty, 0);
    let taxPer = subtotal * 0.1;
    let total = subtotal + taxPer;
    const newOrder = await new Order({
      userId: _id,
      items: items,
      shipping: data.shipping,
      payment_status: "unpaid",
      total,
      subtotal,
    }).save();
    

    res.status(201).json({success : true, message : "Order Created Successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAllOrder = async (req, res) => {
  try {
    const allOrders = await Order.find();
    if (allOrders.length <= 0) {
      return res
        .status(200)
        .json({ message: "You Dont Have any Orders Right Now" });
    }
    return res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
