import React from 'react';
import WeatherDetails from './WeatherDetails';
import './WeatherDetails.css'


const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { name, sys, main, weather } = weatherData;

  return (
    <div className="weather-card">
      <h2>{name}, {sys.country}</h2>
      <p>{new Date().toLocaleString()}</p>
      <p>Temperature: {main.temp}°C</p>
      <p>Weather: {weather[0].description}</p>
      <WeatherDetails weatherData={weatherData} />
    </div>
  );
};

export default WeatherCard;