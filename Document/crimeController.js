const Crime = require('../models/Crime');

exports.getCrimes = async (req, res) => {
  try {
    const crimes = await Crime.find().sort({ updatedAt: -1 });
    console.log('Crimes fetched from MongoDB:', crimes);
    if (!crimes.length) {
      return res.status(404).json({ error: 'No crime resources available. Please add some data.', status: 404 });
    }
    res.json(crimes);
  } catch (error) {
    console.error('Error fetching crimes:', error.stack);
    res.status(500).json({ error: 'Server error: Failed to fetch crimes. Please try again.', details: error.message, status: 500 });
  }
};

exports.createCrime = async (req, res) => {
  try {
    const crime = new Crime(req.body);
    await crime.save();
    console.log('Crime added successfully:', crime);
    res.status(201).json({ message: 'Crime info added successfully', crime });
  } catch (error) {
    console.error('Error adding crime:', error.stack);
    res.status(500).json({ error: 'Server error: Failed to add crime. Please try again.', details: error.message, status: 500 });
  }
};

exports.updateCrime = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCrime = await Crime.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedCrime) {
      return res.status(404).json({ error: 'Crime not found.', status: 404 });
    }
    res.json({ message: 'Crime updated successfully', crime: updatedCrime });
  } catch (error) {
    console.error('Error updating crime:', error);
    res.status(500).json({ error: 'Failed to update crime. Please try again.', details: error.message, status: 500 });
  }
};

exports.deleteCrime = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCrime = await Crime.findByIdAndDelete(id);
    if (!deletedCrime) {
      return res.status(404).json({ error: 'Crime not found.', status: 404 });
    }
    res.json({ message: 'Crime deleted successfully' });
  } catch (error) {
    console.error('Error deleting crime:', error);
    res.status(500).json({ error: 'Failed to delete crime. Please try again.', details: error.message, status: 500 });
  }
};