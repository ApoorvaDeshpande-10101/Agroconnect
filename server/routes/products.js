const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
 
const {
  getProducts,
  getProduct,
  getMyProducts,
  addProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, farmerOnly } = require('../middleware/auth');
 
// Multer config
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`);
  },
});
 
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};
 
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
 
router.get('/', getProducts);
router.get('/my-products', protect, farmerOnly, getMyProducts);
router.get('/:id', getProduct);
router.post('/', protect, farmerOnly, upload.single('image'), addProduct);
router.delete('/:id', protect, farmerOnly, deleteProduct);
 
module.exports = router;