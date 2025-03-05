const express = require('express');
const router = express.Router();
const { validateContact } = require('../middleware/validate');
const contactController = require('../controllers/contactController');

router.post('/', validateContact, contactController.createContact);

module.exports = router;