const express = require('express');
const locationController = require('../controllers/location-controller');
const router = express.Router();

router.get('/:ip', locationController.getLocation);

module.exports = router;
