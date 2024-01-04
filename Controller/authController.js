const userModel = require('../Models/userModel');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailAlreadyExists = await userModel.findOne({ email });
    if (emailAlreadyExists) {
      return res.status(400).json({ msg: 'Email already exists' });
    }
    const user = await userModel.create({ username, email, password });
    const tokenUser = user.getJWTToken();
    res.status(201).json({ msg: user, tokenUser });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid Credentails' });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ msg: 'Invalid Credentails' });
    }
    const token = user.getJWTToken();
    res.cookie('token', token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Cookie expiration time (7 days)
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
    });
    res.status(200).json({ msg: 'login successfully', token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged Out Successfully',
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

module.exports = { register, login, logout };
