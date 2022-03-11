const geoip = require('geoip-lite');

exports.getLocation = (req, res, next) => {
  let ip;
  let geo;

  if (req.params.ip === 'me') {

    if (!req.headers['x-forwarded-for']) {
      res.send('Unable to get coordinates from IP address.');
    }
    else {
      ip = req.headers['x-forwarded-for'].split(',')[0];
    }
  }
  else {
    ip = req.params.ip;
  }

  geo = geoip.lookup(ip);
	res.json({
		ip,
		lat: geo.ll[0],
		lon: geo.ll[1]
	});
}
