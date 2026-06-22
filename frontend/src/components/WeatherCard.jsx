function WeatherCard({ weather }) {
  return (
    <div className="weather-card">

      <div className="temp-section">
        <h1>
          {Math.round(weather.current.temperature_2m)}°C
        </h1>
      </div>

      <div className="weather-details">

        <div className="detail-box">
          <h3>Humidity</h3>
          <p>{weather.current.relative_humidity_2m}%</p>
        </div>

        <div className="detail-box">
          <h3>Wind Speed</h3>
          <p>{weather.current.wind_speed_10m} km/h</p>
        </div>

      </div>

    </div>
  );
}

export default WeatherCard;