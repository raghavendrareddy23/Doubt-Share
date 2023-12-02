const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { createAccessToken } = require('../utils/token');

// Function to register a new user
async function registerUser(req, res) {
  try {
    const { email, password, userType, classGrade, language } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      userType,
      classGrade,
      language,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Function to log in a user
async function loginUser(req, res) {
  try {
    const { email, password, userType } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check user type
    if (user.userType !== userType) {
      return res.status(401).json({ message: 'Invalid user type for this account' });
    }

    // Create a JWT token
    const token = createAccessToken({ userId: user._id });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


// Function to fetch user details
async function getUserDetails(req, res) {
  try {
    // Assuming you're using middleware to extract userId from the token
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user details
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
};
