const express = require('express');
const router = express.Router();
const {getMyOrder,createOrder,getOrderDetails,getAllOrders,updateOrderStatus} = require('./order.controller');

router.route('/').get(getMyOrder).post(createOrder);
router.route('/:id').get(getOrderDetails);
router.route('/admin/').get(getAllOrders);
router.route('/admin/:id').put(updateOrderStatus);



module.exports=router;
