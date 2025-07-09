const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const stripeRoutes = require("./routes/stripeRoute");
const Order = require("./models/orderModel");
const wishlistRoutes = require("./routes/wishlistRoutes");
const { checkProducts } = require("./controllers/productControllers");
const { checkUsers } = require("./controllers/userController");

// import express from 'express'
// import mongoose from 'mongoose';
// import dotenv from "dotenv"
// import userRoutes from './routes/userRoutes.js'
// import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use("/api/v1/orderStripe/", stripeRoutes);
app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Hello! Welcome to Ecommerce Store API");
});

mongoose
  .connect(process.env.MONGO_URI, {
    autoIndex: false,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is Listenening on Port : ${process.env.PORT} and Connected to Databse`
      );
    });
  })
  .catch((err) => {
    console.log(err);
});

checkProducts();
checkUsers();
