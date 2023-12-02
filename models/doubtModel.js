// models/DoubtRequest.js
const mongoose = require('mongoose');

const doubtRequestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doubtSubjectType: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Accepted', 'Closed'], default: 'Open' },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DoubtRequest', doubtRequestSchema);
