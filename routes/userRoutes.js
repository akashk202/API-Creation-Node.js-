const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Basic CRUD routes without authentication
router.get('/with-details', userController.getAllUsersWithDetails);
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;