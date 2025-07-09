const { validationResult } = require("express-validator");
const Product = require("../models/productModel");
const { products } = require("../data");

module.exports.checkProducts = async () => {
  Product.find().then((result) => {
    if (result.length === 0) {
      products.forEach(async (product) => {
        const newProduct = await new Product(product).save();
      });
    }
  }).catch(err => console.log(err))
};

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports.getSingleProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.findById(_id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.errors[0].msg });
    }
    const user = req.user;
    if (!user) {
      return res.status(403).json({ error: "Cannot create product" });
    }
    const data = req.body;
    const newProduct = await new Product(data).save();
    if (!newProduct) {
      return res.status(400).json({ error: "Error creating product" });
    }
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.addReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.errors[0].msg });
    }
    const { productId } = req.params;
    const { _id, username } = req.user;
    const { message, rating } = req.body;

    const review = {
      userId: _id,
      username,
      message,
      rating,
    };

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    const { reviews } = existingProduct;
    const newReviews = [...reviews, review];
    const newRating =
      reviews.length !== 0
        ? newReviews.reduce((acc, curItem) => acc + curItem.rating, 0) /
          newReviews.length
        : rating;
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      {
        $set: { rating: newRating, numOfReviews: newReviews.length },
        $push: { reviews: review },
      },
      { new: true }
    );

    return res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    let data = req.body;
    let { productId } = req.params;
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let newProduct = {
      name: data.name,
      price: data.price,
      category: data.category,
      description: data.description,
      brand: data.brand,
      countInStock: data.countInStock,
      featured: data.featured,
      image: data.image,
      rating: existingProduct.rating,
      reviews: [...existingProduct.reviews],
      numOfReviews: existingProduct.numOfReviews,
    };
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      newProduct,
      { new: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    let { productId } = req.params;
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    const deletedProduct = await Product.findByIdAndDelete({ _id: productId });
    const allProducts = await Product.find();

    return res.status(200).json(deletedProduct);
  } catch (error) {}
};
