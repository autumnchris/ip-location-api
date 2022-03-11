const express = require('express');
const locationController = require('../controllers/location-controller');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/ip/:ip', locationController.getLocation);

module.exports = router;
