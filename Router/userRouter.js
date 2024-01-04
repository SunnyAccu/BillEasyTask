const express = require('express');
const { register, login, logout } = require('../Controller/authController');
const {
  getAllUsers,
  getSingleUsers,
  updateUser,
  deleteUser,
} = require('../Controller/userController');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);

router.route('/getAllUsers').get(getAllUsers);
router
  .route('/getSingleUser/:id')
  .get(getSingleUsers)
  .patch(updateUser)
  .delete(deleteUser);
module.exports = router;
