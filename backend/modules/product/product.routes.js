const express = require('express');
const router = express.Router();
const { getProducts, getProductDetail, createNewProduct, updateProduct, deleteProduct } = require('./product.controller');


router.route('/').get(getProducts);
router.route('/:id').get(getProductDetail);
router.route('/admin').post(createNewProduct);
router.route('/admin/:id').put(updateProduct).delete(deleteProduct);


module.exports = router;
