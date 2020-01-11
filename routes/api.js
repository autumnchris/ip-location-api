const express = require('express');
const iplocation = require('iplocation').default;
const router = express.Router();

router.get('/:ip', (req, res, next) => {
  let ip;

  if (req.params.ip === 'me') {
    ip = req.headers['x-forwarded-for'].split(',')[0];
  }
  else {
    ip = req.params.ip;
  }
  iplocation(ip).then(result => {
    res.json({
      ip,
      lat: result.latitude,
      lon: result.longitude
    });
  }).catch(error => {
    res.json({
      error: 'Could not get coordinates from IP address.'
    });
  });
});

module.exports = router;
