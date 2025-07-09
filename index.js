const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const stripeRoutes = require("./routes/stripeRoute");
const wishlistRoutes = require("./routes/wishlistRoutes");

const { checkProducts } = require("./controllers/productControllers");
const { checkUsers } = require("./controllers/userController");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/orderStripe", stripeRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("Hello! Welcome to Ecommerce Store API");
});

// Database Connection & Server Start
mongoose
  .connect(process.env.MONGO_URI, {
    autoIndex: false,
  })
  .then(() => {
    // ✅ Call insert checks here AFTER DB is connected
    checkProducts();
    checkUsers();

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT} and connected to MongoDB`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
  });

  