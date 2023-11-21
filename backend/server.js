
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the country info backend!');
  });

app.get('/country/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    if (response.data.length === 0) {
      return res.status(404).json({ error: 'Country not found' });
    }
    const countryInfo = response.data[0];
    res.json(countryInfo);
  } catch (error) {
    console.error('Error fetching country info:', error);
    res.status(500).json({ error: 'Could not fetch country info' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
