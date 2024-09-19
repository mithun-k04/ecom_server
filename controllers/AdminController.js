const AdminModel = require("../models/Admin");
const CategoryModel = require("../models/Category")

const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const modifiedName = username.toLowerCase();

    const existingAdmin = await AdminModel.findOne({ name: modifiedName });

    if (existingAdmin) {
      return res.json({ message: "Admin already exists" });
    }

    const admin = new AdminModel({ name: modifiedName, password: password });
    await admin.save();

    res.status(201).json({ message: "Admin Registration Successful" });
  } catch (err) {
    console.error('Error adding admin:', err);
    res.status(500).json({ error: err.message });
  }
}

const checkAdmin = async (req, res) => {
    try {
      const {username,password}=req.body;
      const modifiedName=username.toLowerCase();
      const admin = await AdminModel.findOne({ name: modifiedName });
      if(!admin){
        return res.send({ message: "Admin not found" });
      }

      if(admin.password === password){
        return res.send({ message: "Admin Login Successful" });
      }
      else{
        return res.send({ message: "Invalid Password" });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  const addCategory = async (req, res) => {
    try {
      const CategoryData = {
        name: req.body.name.toLowerCase(),
        image: req.file ? req.file.path : '', 
      };
  
      const newCategory = new CategoryModel(CategoryData);
      await newCategory.save();
  
      res.json({ message: 'Category added successfully', data: newCategory });
    } catch (error) {
      console.error('Error adding Category:', error);
      res.status(500).json({ message: 'Failed to add Category', error });
    }
  };

  const getCategory = async (req, res) => {
    try {
      const CategoryData = await CategoryModel.find()
  
      res.json(CategoryData);
    } catch (error) {
      console.error('Error adding Category:', error);
      res.status(500).json({ message: 'Failed to add Category', error });
    }
  };


module.exports = { addAdmin, checkAdmin, addCategory, getCategory };
