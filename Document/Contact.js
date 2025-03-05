const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, default: '' }, // Optional, anonymous
  email: { type: String, default: '' }, // Optional, anonymous
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', contactSchema);