const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ msg: 'Please login to access this route' });
    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodeData.id);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = isAuthenticatedUser;
