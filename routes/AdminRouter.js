const { addAdmin, checkAdmin, addCategory, getCategory} = require("../controllers/AdminController");
const express = require("express");
const AdminRouter = express.Router();
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


AdminRouter.post("/register", addAdmin);
AdminRouter.post("/validate", checkAdmin);
AdminRouter.post("/category", upload.single('image'), addCategory);
AdminRouter.get("/getcategories", getCategory);


module.exports = AdminRouter;  
