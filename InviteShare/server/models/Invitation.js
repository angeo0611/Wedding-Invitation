const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slug: { type: String, required: true, unique: true },
  theme: {
    templateId: { type: String, default: 'elegant' },
    primaryColor: { type: String, default: '#87A96B' },
    secondaryColor: { type: String, default: '#F7E7CE' },
    fontFamily: { type: String, default: 'serif' }
  },
  couple: {
    bride: { name: String, photo: String },
    groom: { name: String, photo: String }
  },
  event: {
    date: Date,
    time: String,
    venueName: String,
    address: String,
    mapUrl: String
  },
  sections: {
    story: { title: String, content: String },
    gallery: [String],
    musicUrl: { type: String, default: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    videoUrl: String
  },
  giftRegistry: [
    { platform: String, accountName: String, accountNumber: String }
  ],
  stats: {
    views: { type: Number, default: 0 }
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Invitation', invitationSchema);
