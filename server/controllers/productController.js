const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');
 
// @desc Get all products
// @route GET /api/products
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
 
    if (search) {
      filter.cropName = { $regex: search, $options: 'i' };
    }
    if (category && category !== 'All') {
      filter.category = category;
    }
 
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// @desc Get single product
// @route GET /api/products/:id
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmerId', 'name email phone location');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// @desc Get farmer's own products
// @route GET /api/products/my-products
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmerId: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// @desc Add product
// @route POST /api/products
const addProduct = async (req, res) => {
  try {
    const { cropName, category, price, quantity, location, description } = req.body;
 
    if (!cropName || !price || !quantity || !location) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }
 
    let imagePath = '';
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
 
    const product = await Product.create({
      farmerId: req.user._id,
      farmerName: req.user.name,
      farmerPhone: req.user.phone || '',
      cropName,
      category: category || 'Other',
      price: Number(price),
      quantity,
      location,
      description: description || '',
      image: imagePath,
    });
 
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// @desc Delete product
// @route DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
 
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
 
    if (product.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }
 
    // Delete image if exists
    if (product.image) {
      const imgPath = path.join(__dirname, '..', product.image);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }
 
    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
module.exports = { getProducts, getProduct, getMyProducts, addProduct, deleteProduct };