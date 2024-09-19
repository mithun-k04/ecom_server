const ProductModel = require("../models/Products");

const addProduct = async (req, res) => {
    try {
        const productData = {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          category: req.body.category,
          quantity: req.body.quantity,
          discount: req.body.discount,
          image: req.file ? req.file.path : '', 
        };
    
        const newProduct = new ProductModel(productData);
        await newProduct.save();
    
        res.json({ message: 'Product added successfully', data: newProduct });
      } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Failed to add product', error });
      }
}

const getProduct = async (req,res) => {
  try {
    const products = await ProductModel.find();
    res.json(products)
  }
  catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product', error });
  }
}

const getParticular = async (req, res) => {
  try {
    const pid = req.params.pid; 
    const product = await ProductModel.findOne({ _id: pid });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
};

const getUserProduct =  async (req, res) => {
  const categoryName = req.params.name; 
   try {
    const products = await ProductModel.find({ category: categoryName });
    
    if (products.length > 0) {
      res.json(products); 
    } else {
      res.json({ message: 'No products found for this category' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error });
  }
}

const uploadImages = async(req,res) => {
  try {
    const pid = req.body.pid;
    const files = req.files;

    const product = await ProductModel.findById(pid);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.images.push(...files.map(file => file.path)); 
    await product.save();

    res.status(200).json({ message: 'Images uploaded successfully!', files });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Error uploading images', error });
  }
}

const updateProduct= async(req,res)=>
{
  const { pid } = req.params;
  const updateData = req.body;

  try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
          pid,
          { $set: updateData },
          { new: true, runValidators: true }
      );

      if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(updatedProduct);
  } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Error updating product', error });
  }
}

module.exports = { addProduct, getProduct, getParticular, getUserProduct,uploadImages, updateProduct};
