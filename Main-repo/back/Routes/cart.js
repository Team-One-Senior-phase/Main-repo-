const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const isAdmin = require('../middleware/isAdmin');
const cartController = require('../Controllers/cartController.js');
const orderController= require('../Controllers/orderController.js')


router.post('/', cartController.addToCart)
router.delete('/',cartController.deleteCartItem)
router.post('/order',orderController.createOrder)
router.get('/:user_id',cartController.getCartItemsHandler)


module.exports = router;