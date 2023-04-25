const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, getUserById, deleteUser, getUsers } = require('../Controllers/userController.js');
const auth = require('../middleware/auth.js');
const isAdmin = require('../middleware/isAdmin');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:userId', auth, updateUser);
router.get('/:userId', auth, getUserById);
router.delete('/:userId', auth, deleteUser);
router.get('/' , getUsers);

module.exports = router;
