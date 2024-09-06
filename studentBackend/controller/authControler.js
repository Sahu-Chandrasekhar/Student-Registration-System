const Admin = require('../models/authModel');  //connecting to models/authModel.js
const jwt = require('jsonwebtoken');    //password secure (npm i jsonwebtoken)
const bcrypt = require('bcrypt');      //mach or missmach pass or user(npm i bcrypt)




const signUP = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'email already exist' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword })
    await newAdmin.save();

    const token = jwt.sign({ adminId: newAdmin._id }, process.env.JWT_SECRET)
    res.status(201).json({ token });

  } catch (error) {
    console.error('reg error', error);
    res.status(500).json({ message: 'server error' });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'admin not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(405).json({ message: 'Invalid Password' });
    }
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET)
    res.json({ token });
  } catch (error) {
    console.error('Login Error', error);
    res.status(407).json({ message: "Server Error" });
  }
}

// const logout = async (req, res) => {
//   try {
//     res.clearCookie('yourCookieName');
//     res.status(200).json({ message: 'Logout successful', token: null });
//   } catch (error) {
//     console.error('Logout Error', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

module.exports = { signUP, login };

//https://adminportal-a4e4d.web.app/admin/dashboard













