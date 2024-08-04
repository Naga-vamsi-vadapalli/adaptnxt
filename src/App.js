import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Rename error to errorMessage
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Get the user's current location when the component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, handleError);
    } else {
      fetchWeatherByCity('London'); // Default location if Geolocation API is not available
    }
  }, []);

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    fetchWeatherByCoords(latitude, longitude);
  };

  const handleError = () => {
    fetchWeatherByCity('London'); // Default location if user denies permission or there is an error
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const apiKey = '81595429d8667fc4ccd058b6ad4f73f4';
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage('Location not found');
      setWeatherData(null);
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      const apiKey = '81595429d8667fc4ccd058b6ad4f73f4';
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage('Location not found');
      setWeatherData(null);
    }
  };

  const fetchWeather = () => {
    fetchWeatherByCity(location);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
        <h1>Weather App</h1>
        <div className="search">
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Enter city name or zip code"
            className={darkMode ? 'dark-mode' : ''}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <WeatherCard weatherData={weatherData} />
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      </div>
    </div>
  );
};

export default App;