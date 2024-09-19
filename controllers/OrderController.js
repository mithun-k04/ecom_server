const OrderModel = require("../models/Orders")
const ProductModel = require("../models/Products");


const newOrder = async (req, res) => {
    try {
      const { customer, product, phone, address, quantity } = req.body;

      const products = await ProductModel.findOne({_id:product})
      products.quantity = products.quantity - quantity
      await products.save()
  
      const newOrder = await OrderModel.create({
        customer,
        product,
        phone,
        address,
        quantity,
      });
  
      res.json({
        message: "Order created successfully",
        newOrder,
      });
    } catch (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ message: "Failed to create order", error: err });
    }
  };

const getOrders= async(req,res)=>
{
   const orders = await OrderModel.find()
   res.json(orders)
}

const orderConfirm = async (req, res) => {

  const { pid } = req.params;
        const order = await OrderModel.findOne({ _id: pid });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = 'confirmed';
        await order.save();
        res.json({ message: 'Order confirmed successfully' });
};

  

module.exports={newOrder, getOrders, orderConfirm}