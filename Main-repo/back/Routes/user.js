const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, getUserById, deleteUser, getUsers } = require('../Controllers/userController.js');
const auth = require('../middleware/auth.js');
const isAdmin = require('../middleware/isAdmin');
const orderController= require('../Controllers/orderController.js')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:userId', auth, updateUser);
router.get('/:userId', auth, getUserById);
router.delete('/:userId', auth, deleteUser);
router.get('/' , getUsers);
router.get('/orders/:user_id',orderController.getOrdersByUserId)

module.exports = router;
