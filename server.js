const express = require('express');
const app = express();

// If you previously had dotenv and don't need it, remove it.
// require('dotenv').config(); // <-- not needed for this project

app.use(express.static('public')); // serve static files if you have them

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // adjust if you serve a different file
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // No parameter → current date/time
  if (!dateParam) {
    date = new Date();
  } else {
    // If the param is all digits, treat it as milliseconds since epoch
    // (this handles requests like /api/1451001600000)
    if (/^\d+$/.test(dateParam)) {
      date = new Date(Number(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Invalid date check
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Use provided port or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Timestamp Microservice listening on port ${PORT}`);
});
