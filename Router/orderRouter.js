const express = require('express');
const {
  createOrder,
  myOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
  totalRevenue,
  getAllOrder,
} = require('../Controller/orderController');
const isAuthenticatedUser = require('../middleware/auth');

const router = express.Router();

router.route('/create').post(isAuthenticatedUser, createOrder);
router.route('/myorders').get(isAuthenticatedUser, myOrders);
router
  .route('/orderbyId/:orderId')
  .get(isAuthenticatedUser, getOrderById)
  .patch(isAuthenticatedUser, updateOrder)
  .delete(isAuthenticatedUser, deleteOrder);

// total revenue

router.route('/total-revenue').get(totalRevenue);

// retive list of user with total amount

router.route('/getAllOrder').get(getAllOrder);
module.exports = router;
