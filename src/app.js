// Import the built-in 'http' module
const https = require('https');
const { hostname } = require('./config');

const options = {
  hostname,
  path: '/api/activity',
  method: 'GET',
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      const { activity, participants, price } = result;
      console.log(`Activity: ${activity}`);
      console.log(`Number of Participants: ${participants}`);
      console.log(`Relative Price (score out of 1): ${price}`);
    } catch (error) {
      console.error('Error parsing JSON response:', error);
    }
  });
});

req.on('error', (error) => {
  console.error('Error making API request:', error);
});

req.end();
