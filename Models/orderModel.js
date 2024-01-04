const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
