// import mongoose from "mongoose";
const mongoose = require('mongoose');

const reviewSchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required : true
  },
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
};



const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum : ["Mobile Phones", "PCs and Laptops", "Watches", "Cameras" ],
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  featured : {
    type  : Boolean,
    default : false
  },
  rating: {
    type: Number,
    default : 0
  },
  reviews: [reviewSchema],
  numOfReviews: {
    type : Number,
    default : 0
  }

});


const Product = mongoose.model('product', productSchema);

module.exports = Product;
