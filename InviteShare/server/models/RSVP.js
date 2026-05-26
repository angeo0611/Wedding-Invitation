const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  invitationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invitation', required: true },
  guestName: { type: String, required: true },
  email: String,
  attendance: { type: String, enum: ['attending', 'declined'], required: true },
  plusOne: { type: Number, default: 0 },
  message: String,
  dietaryNotes: String
}, { timestamps: true });

module.exports = mongoose.model('RSVP', rsvpSchema);
