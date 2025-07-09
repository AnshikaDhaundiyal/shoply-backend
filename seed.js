const mongoose = require("mongoose");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const Wishlist = require("./models/wishlistModel");
const Order = require("./models/orderModel");
const { products, users } = require("./data");
const bcrypt = require("bcryptjs");
const { config } = require("dotenv");

config();


mongoose
  .connect(process.env.MONGO_URI, {
    autoIndex: false,
  })
  .then(() => {
    console.log("Connected to Database..");
  })
  .catch(console.log);

async function connectDB() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    await User.deleteMany({});
    await Cart.deleteMany({});
    await Wishlist.deleteMany({});
    await Order.deleteMany({});
    users.forEach(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      let newUser = await new User(user).save();
      if (newUser) {
        let newCart = await new Cart({
          userId: newUser._id,
          items: [],
        }).save();
        if (newCart) {
          await new Wishlist({
            userId: newUser._id,
            items: [],
          }).save();
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

connectDB();
