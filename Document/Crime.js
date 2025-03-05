const mongoose = require('mongoose');

const crimeSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  prevention: { type: String, required: true },
  legalActions: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

crimeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Crime', crimeSchema);