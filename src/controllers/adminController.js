const User = require('../models/userModel');
const Sector = require('../models/sectorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
  const { body } = req;
  const newUser = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    mobile: body.mobile,
    role:"admin"
  });
  try {
    const dataToSave = await newUser.save();
    res.status(200).json({ success: true,message:"Admin Created", data: dataToSave });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(400).json({ success: false, message: "Email Already Exists!" });
    } else {
      res.status(400).json({ success: false, message: error.message });
    }
  }
};
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email,role:"admin" });

    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ success: false, message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({
      success: true,
      user: user,
      token: jwt.sign({
        user: {
          email: user.email,
          name: user.name,
          mobile: user.mobile,
          _id: user._id
        }
      }, 'RESTFULAPIs')
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'An error occurred during authentication.' });
  }
};

const loginRequired = async (req, res, next) => {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized userss!!' });
  }
};
const addSector = async (req, res) => {
  const { body } = req;
  const newSector = new Sector({
    origin: body.origin,
    destination: body.destination
  });
  try {
    const dataToSave = await newSector.save();
    res.status(200).json({ success: true,message:"Sector Created", data: dataToSave });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: "Email Already Exists!" });
    } else {
      res.status(400).json({ success: false, message: error.message });
    }
  }
};
module.exports = {
  register,
  login,
  loginRequired,
  addSector
};