const userModel = require('../Models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).select('-password');
    res.status(200).json({ msg: users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleUsers = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ _id: req.params.id })
      .select('-password');
    if (!user) {
      return res
        .status(400)
        .json({ msg: `no user with this id : ${req.params.id}` });
    }
    res.status(200).json({ msg: user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userModel
      .findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })
      .select('-password');
    if (!user) {
      return res
        .status(400)
        .json({ msg: `no user with this id : ${req.params.id}` });
    }
    res.status(200).json({ msg: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res
        .status(400)
        .json({ msg: `no user with this id : ${req.params.id}` });
    }
    res.status(200).json({ msg: 'Delete Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = { getAllUsers, getSingleUsers, updateUser, deleteUser };
