const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.get('/search', async (req, res) => {
  const { town } = req.query;
  const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY'; // Replace with your Google Places API Key
  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=barbershops+in+${town}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data.results); // Send the results back to the frontend
  } catch (error) {
    console.error('Error fetching barbershops:', error);
    res.status(500).send('Error fetching barbershops');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
async function fetchBarbershops() {
    const town = document.getElementById('town-input').value;
    const response = await fetch(`/search?town=${town}`);
    const barbershops = await response.json();
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
  
    barbershops.forEach(shop => {
      const shopElement = document.createElement('div');
      shopElement.innerHTML = `
        <h3>${shop.name}</h3>
        <p>Rating: ${shop.rating}</p>
        <p>Address: ${shop.formatted_address}</p>
      `;
      resultsContainer.appendChild(shopElement);
    });
  }
  