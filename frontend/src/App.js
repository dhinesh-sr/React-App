
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [country, setCountry] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCountryInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/country/${country}`);
      setCountryInfo(response.data);
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCountryInfo(null);
        setErrorMessage('Country not found');
      } else {
        console.error('Error fetching country info:', error);
        setErrorMessage('Error fetching country info');
      }
    }
  };

  return (
    <div className="App">
      <h1>Country Information</h1>
      <p>Enter a country name to get information</p>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a country name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button onClick={fetchCountryInfo}>Get Country Info</button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {countryInfo && (
        <div className="country-info">
          <h2>{countryInfo.name.common}</h2>
          <p>Population: {countryInfo.population}</p>
        </div>
      )}
    </div>
  );
}

export default App;
