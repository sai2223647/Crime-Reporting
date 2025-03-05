const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  crimeType: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: Date, required: true },
  evidence: { type: String, default: '' },
  witnesses: { type: String, default: '' },
  name: { type: String, default: '' }, // Optional, anonymous
  age: { type: Number, default: null }, // Optional, anonymous
  phoneNumber: { type: String, default: '' }, // Optional, anonymous
  status: { type: String, default: 'pending' }, // e.g., pending, resolved
});

module.exports = mongoose.model('Report', reportSchema);