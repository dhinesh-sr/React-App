
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [country, setCountry] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchCountryInfo = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://country-app-es6b.onrender.com/country/${country}`);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCountry(e.target.value.toLowerCase());
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
          onChange={handleInputChange}
        />
        <button onClick={fetchCountryInfo}>Get Country Info</button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {isLoading && <p className="loading-message">Loading...</p>}

      {countryInfo && !isLoading && (
        <div className="country-info">
          <h2>{countryInfo.name.common}</h2>
          <p>Capital: {countryInfo.capital}</p>
          <p>Population: {countryInfo.population}</p>
          <p>Region: {countryInfo.region}</p>
          {/* <p>Area: {countryInfo.area} km²</p> */}
          <p>Languages: {Object.values(countryInfo.languages).join(', ')}</p>
          <p>Timezones: {countryInfo.timezones.join(', ')}</p>
          <p>
            Flag:
            <br /><br />
            {countryInfo.flags && (
              <img src={countryInfo.flags.svg} alt="Country Flag" width="150" />
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
