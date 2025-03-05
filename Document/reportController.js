const Report = require('../models/Report');

exports.createReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Failed to report crime. Please try again.', details: error.message, status: 500 });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ time: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports. Please try again.', details: error.message, status: 500 });
  }
};

exports.getRecentReports = async (req, res) => {
  try {
    const recentReports = await Report.find().sort({ time: -1 }).limit(5);
    res.json(recentReports);
  } catch (error) {
    console.error('Error fetching recent reports:', error);
    res.status(500).json({ error: 'Failed to fetch recent reports. Please try again.', details: error.message, status: 500 });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReport = await Report.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedReport) {
      return res.status(404).json({ error: 'Report not found.', status: 404 });
    }
    res.json({ message: 'Report updated successfully', report: updatedReport });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ error: 'Failed to update report. Please try again.', details: error.message, status: 500 });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReport = await Report.findByIdAndDelete(id);
    if (!deletedReport) {
      return res.status(404).json({ error: 'Report not found.', status: 404 });
    }
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: 'Failed to delete report. Please try again.', details: error.message, status: 500 });
  }
};