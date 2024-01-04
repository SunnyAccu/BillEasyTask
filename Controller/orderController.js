const orderModel = require('../Models/orderModel');

const createOrder = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    console.log(req.user);
    const order = await orderModel.create({
      totalAmount,
      userId: req.user.id,
    });
    res.status(201).json({ msg: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = createOrder;
