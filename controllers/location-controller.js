const iplocation = require('iplocation').default;

exports.getLocation = (req, res, next) => {
  const errorMessage = 'Unable to get coordinates from IP address.';
  let ip;

  if (req.params.ip === 'me') {

    if (!req.headers['x-forwarded-for']) {
      res.send(errorMessage);
    }
    else {
      ip = req.headers['x-forwarded-for'].split(',')[0];
    }
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
    res.send(errorMessage);
  });
}
