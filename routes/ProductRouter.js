const express = require('express');
const { addProduct, getProduct, getParticular, getUserProduct, uploadImages, updateProduct} = require('../controllers/ProductController'); 
const ProductRouter = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

ProductRouter.post('/addproduct', upload.single('image'), addProduct);
ProductRouter.get('/getproducts', getProduct);
ProductRouter.get('/getparticular/:pid', getParticular);
ProductRouter.get('/getuserproducts/:name', getUserProduct);
ProductRouter.post('/uploadimages',upload.array('images'), uploadImages)
ProductRouter.put('/update/:pid',updateProduct)


module.exports = ProductRouter;  
