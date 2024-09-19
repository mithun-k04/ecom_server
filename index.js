const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const AdminRouter = require('./routes/AdminRouter');  
const ProductRouter = require('./routes/ProductRouter'); 
const OrderRouter = require("./routes/OrderRouter"); 

const app = express();

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));


app.use('/api/admin', AdminRouter);  
app.use('/api/product', ProductRouter); 
app.use('/api/orders', OrderRouter)



const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://mithunkaruppusamy3:admin@appdb.nv1k3.mongodb.net/?retryWrites=true&w=majority&appName=appDB');
        console.log("DB Connected");
    } catch (error) {
        console.error("DB connection failed:", error);
        process.exit(1); 
    }
};
connectDB();


const port = process.env.PORT || 10000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
