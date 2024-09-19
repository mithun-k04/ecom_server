const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'pending', 
  },
}, { timestamps: true });

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel
