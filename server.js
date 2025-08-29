const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date();
  } else {
    // If it's an integer string (only digits, optional leading + or -) treat as milliseconds
    if (/^[+-]?\d+$/.test(dateParam)) {
      date = new Date(Number(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),      // Number
    utc: date.toUTCString()    // String in required format
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
