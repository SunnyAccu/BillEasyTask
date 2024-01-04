const express = require('express');
const createOrder = require('../Controller/orderController');
const isAuthenticatedUser = require('../middleware/auth');

const router = express.Router();

router.route('/create').post(isAuthenticatedUser, createOrder);

module.exports = router;
