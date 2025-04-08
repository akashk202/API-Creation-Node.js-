const express = require('express');
const router = express.Router();
const detailsController = require('../controllers/detailsController');
const { auth } = require('../middlewares/auth');

// Protected routes
router.post('/', auth, detailsController.createDetails);
router.get('/:userId', auth, detailsController.getUserDetails);

// Add other details routes as needed

module.exports = router;