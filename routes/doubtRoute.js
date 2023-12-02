const express = require('express');
const router = express.Router();
const {
  createDoubtRequest,
  listUserDoubtRequests,
  acceptDoubtRequest,
  rejectDoubtRequest,
  // Add other doubt request operations as needed
} = require('../controllers/doubtRequestController');

// Create a doubt request
router.post('/create', createDoubtRequest);

// List doubt requests by a user
router.get('/user/:userId', listUserDoubtRequests);

// Accept a doubt request (by tutor)
router.patch('/accept', acceptDoubtRequest);

// Reject a doubt request (by tutor)
router.patch('/reject', rejectDoubtRequest);

module.exports = router;
