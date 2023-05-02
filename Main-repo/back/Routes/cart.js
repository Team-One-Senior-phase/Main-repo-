const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const isAdmin = require('../middleware/isAdmin');
const cartController = require('../Controllers/cartController.js');
const orderController= require('../Controllers/orderController.js')


router.post('/',auth, cartController.addToCart)
router.delete('/',auth, cartController.deleteCartItem)
router.post('/order',auth , orderController.createOrder)

module.exports = router;