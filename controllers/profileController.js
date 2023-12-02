const User = require('../models/userModel');

async function getProfile(req, res) {
  try {
    const userId = req.userId; // Assuming the user ID is extracted from the token using middleware

    // Fetch user details based on the user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user profile details (excluding sensitive information)
    const { email, userType, classGrade, language, allowedDoubtSubjectTypes } = user;
    res.status(200).json({
      email,
      userType,
      classGrade,
      language,
      allowedDoubtSubjectTypes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  getProfile,
};
