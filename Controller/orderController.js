const orderModel = require('../Models/orderModel');

const createOrder = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const order = await orderModel.create({
      totalAmount,
      userId: req.user.id,
    });
    res.status(201).json({ msg: order });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const myOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel.find({ userId: userId });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await orderModel.findById(orderId);

    if (!order) {
      return next(new ErrorHandler('Order not found', 404));
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateOrder = async (req, res) => {
  const user = await orderModel
    .findOneAndUpdate({ _id: req.params.orderId }, req.body, {
      new: true,
      runValidators: true,
    })
    .select('-password');
  if (!user) {
    return res
      .status(400)
      .json({ msg: `no order with this id : ${req.params.orderId}` });
  }
  res.status(200).json({ msg: user });
};

const deleteOrder = async (req, res) => {
  const user = await orderModel.findOneAndDelete({ _id: req.params.orderId });
  if (!user) {
    return res
      .status(400)
      .json({ msg: `no order with this id : ${req.params.orderId}` });
  }
  res.status(200).json({ msg: 'Delete Successfully' });
};

const totalRevenue = async (req, res) => {
  try {
    const totalRevenueResult = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the result
          totalRevenue: 1,
        },
      },
    ]);

    const totalRevenue =
      totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

    res.json({ totalRevenue });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// retive a list of user with total amount

const getAllOrder = async (req, res, next) => {
  try {
    const orders = await orderModel.find({}).populate('userId');

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  createOrder,
  myOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
  totalRevenue,
  getAllOrder,
};
