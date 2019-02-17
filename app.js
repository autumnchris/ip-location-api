const express = require('express');
const iplocation = require('iplocation').default;

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.use(express.static(`${__dirname}/public`));

app.get('/api/ip/:ip', (req, res) => {
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
      error: "Could not get coordinates from IP address."
    });
  });
});

app.use((req, res) => {
  res.sendFile(`${__dirname}/views/404.html`, 404);
});

app.listen(port, console.log(`Server is listening at port ${port}.`));
