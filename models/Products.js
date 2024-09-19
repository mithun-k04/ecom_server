const mongoose = require("mongoose")


const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String,
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity cannot be less than 0']
    },
    discount: Number,
    images:[String],
})

const ProductModel = mongoose.model("product",ProductSchema)
module.exports = ProductModel;