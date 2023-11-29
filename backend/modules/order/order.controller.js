const productSchema = require('../../models/productSchema');
const OrderSchema = require('../../models/orderSchema');
const { SUCCESS_MESSAGES, ERRORS_MESSAGE } = require('./order.const');

async function getMyOrder(req,res) {
    try{
        const {user} = req;
    const orders = await OrderSchema({
        userId: user._id
    });
    return res.status(200).json({
        data:{
            orders
        },
        message:SUCCESS_MESSAGES.ORDER_FETCHED_SUCCESSFULLY
    })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            message:ERRORS_MESSAGE.SOMETHING_WENT_WRONG,
            error
        })
    }
}


async function createOrder(req,res) {
    try{
        const {
            products = [],
            address
        } = req.body;
        const {user} = req;
        if(!productIds.length){
            throw({message: 'products are missing'});
        }
        const productIds = products.map((product)=>product.productId);
        const productCount = await productSchema.count({
            _id : {$in: productIds}
        });
        if(productCount != products.length){
            throw({message: 'Some products does not exists'});
        }
        let total = 0;
        products.forEach(product=>{
            total += product.price*product.quantity;
        })

        const order = new OrderSchema({
        products,
        address,
        userId: user._id,
        total,
        tax: total*12/100,
        shippingPrice: total*2/100,
        orderTotal: total + total*14/100 
        });
        await order.save();
        return res.status(201).json({
        data:{order},
        message:SUCCESS_MESSAGES.ORDER_CREATED_SUCCESSFULLY
        })

    }catch(error){
        return res.status(400).json({
          message: ERRORS_MESSAGE.SOMETHING_WENT_WRONG,
          error
        })
    }   
}


async function getOrderDetails(req,res) {
    try{
       const {id} = req.params;
       const order = await OrderSchema.findById(id);
       if(!order){
        throw ({ message: 'Invalid Id'});
       };
       return res.status(200).json({
        data:{
            order
        },
        message:SUCCESS_MESSAGES.ORDER_FETCHED_SUCCESSFULLY
       })
    }catch(error){
        return res(400).json({
            message:ERRORS_MESSAGE.SOMETHING_WENT_WRONG,
            error 
        })
    }
}


async function getAllOrders(req,res) {
    try{
       const {user} = req;
       const orders = await OrderSchema.find();
       return  res.status(200).json({
        data:{
            orders
        },
        message: SUCCESS_MESSAGES.ORDER_FETCHED_SUCCESSFULLY
       })
    }catch(error){
        return res.status(500).json({
            message: ERRORS_MESSAGE.SOMETHING_WENT_WRONG,
            error,
          })
    }
}
async function updateOrderStatus(req,res) {
    try{
       const {id} = req.params;
       const {status} = req.body;
       const order = await OrderSchema.findById(id);
       if(!order){
        throw({message:ERRORS_MESSAGE.VALIDATION_MESSAGES.ORDER_NOT_FOUND})
       }
       const {status: currentStatus} = order;
       if (currentStatus === 'delivered' || currentStatus === 'canceled') {
        throw ({ message: 'Order cannot be updated'});
      }
      if (
        (currentStatus === 'processing' && (status != 'confirmed' || status != 'canceled'))
        || (currentStatus === 'confirmed' && (status != 'out for delivery'|| status != 'canceled'))
        || (currentStatus === 'out for delivery' && (status != 'delivered'|| status != 'canceled'))
      ) {
        throw ({ message: 'Invalid order status'})
      }
      order.status = status;
      await order.save();
      return res.status(200).json({
        message: 'Orders updated successfully',
        data: {
         order
        }
     });
    } catch (error) {
      return res.status(400).json({
        message: 'Something went wrong',
        error
      });
    }
}


module.exports = {
    getMyOrder,
    createOrder,
    getOrderDetails,
    getAllOrders,
    updateOrderStatus
}
