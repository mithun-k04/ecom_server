const express = require('express');
const OrderRouter = express.Router();
const {newOrder, getOrders, orderConfirm} = require('../controllers/OrderController'); 

OrderRouter.post('/neworder', newOrder);
OrderRouter.get('/getorders', getOrders);
OrderRouter.put('/confirm/:pid', orderConfirm);


module.exports = OrderRouter;  