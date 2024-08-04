import React from 'react';

const WeatherDetails = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="weather-details">
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDetails;