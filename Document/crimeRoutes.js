const express = require('express');
const router = express.Router();
const { validateReport } = require('../middleware/validate'); // Reusing for simplicity, adjust if needed
const crimeController = require('../controllers/crimeController');

router.get('/', crimeController.getCrimes);
router.post('/', crimeController.createCrime); // Create
router.put('/:id', crimeController.updateCrime); // Update
router.delete('/:id', crimeController.deleteCrime); // Delete

module.exports = router;