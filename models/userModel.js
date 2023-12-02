// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['Student', 'Tutor'], required: true },
  classGrade: { type: String }, // For both Students and Tutors
  language: { type: String }, // For both Students and Tutors
  allowedDoubtSubjectTypes: [{ type: String }], // For Tutors
});

module.exports = mongoose.model('User', userSchema);
