const DoubtRequest = require('../models/doubtModel');
const User = require('../models/userModel');

// Create a doubt request
async function createDoubtRequest(req, res) {
  try {
    const { userId, subjectType, description } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a doubt request
    const newDoubtRequest = new DoubtRequest({
      userId,
      subjectType,
      description,
      status: 'Pending', // You can set initial status as 'Pending' or any default status
    });

    await newDoubtRequest.save();

    res.status(201).json({ message: 'Doubt request created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// List doubt requests by a user
async function listUserDoubtRequests(req, res) {
  try {
    const { userId } = req.params;

    const doubtRequests = await DoubtRequest.find({ userId });

    res.status(200).json(doubtRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Accept a doubt request (by tutor)
async function acceptDoubtRequest(req, res) {
  try {
    const { requestId, tutorId } = req.body;

    // Check if the request exists
    const doubtRequest = await DoubtRequest.findById(requestId);
    if (!doubtRequest) {
      return res.status(404).json({ message: 'Doubt request not found' });
    }

    // Check if the user is a tutor
    const tutor = await User.findById(tutorId);
    if (!tutor || tutor.userType !== 'Tutor') {
      return res.status(400).json({ message: 'Invalid user or not a tutor' });
    }

    // Update doubt request status to 'Accepted' and assign tutor ID
    doubtRequest.status = 'Accepted';
    doubtRequest.tutorId = tutorId;
    await doubtRequest.save();

    res.status(200).json({ message: 'Doubt request accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Reject a doubt request (by tutor)
async function rejectDoubtRequest(req, res) {
  try {
    const { requestId } = req.body;

    // Check if the request exists
    const doubtRequest = await DoubtRequest.findById(requestId);
    if (!doubtRequest) {
      return res.status(404).json({ message: 'Doubt request not found' });
    }

    // Update doubt request status to 'Rejected'
    doubtRequest.status = 'Rejected';
    await doubtRequest.save();

    res.status(200).json({ message: 'Doubt request rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  createDoubtRequest,
  listUserDoubtRequests,
  acceptDoubtRequest,
  rejectDoubtRequest,
};
