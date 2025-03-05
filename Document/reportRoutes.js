const express = require('express');
const router = express.Router();
const { validateReport } = require('../middleware/validate');
const reportController = require('../controllers/reportController');

router.post('/', validateReport, reportController.createReport);
router.get('/', reportController.getReports);
router.get('/recent', reportController.getRecentReports);
router.put('/:id', validateReport, reportController.updateReport); // Update
router.delete('/:id', reportController.deleteReport); // Delete

module.exports = router;