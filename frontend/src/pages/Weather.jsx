import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WeatherCard from "../components/WeatherCard";
import "./Weather.css";

const cities = {
  Srinagar: {
    lat: 34.0837,
    lon: 74.7973,
  },
  Gulmarg: {
    lat: 34.0484,
    lon: 74.3805,
  },
  Pahalgam: {
    lat: 34.0159,
    lon: 75.3180,
  },
  Sonamarg: {
    lat: 34.2996,
    lon: 75.2931,
  },
  Jammu: {
    lat: 32.7266,
    lon: 74.8570,
  },
};

function Weather() {
  const [selectedCity, setSelectedCity] = useState("Srinagar");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");

      const city = cities[cityName];

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );

      const data = await response.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.error(err);

      setError("Failed to load weather information.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  return (
    <>
      <Navbar />

      <div className="weather-page">

        <div className="weather-container">

          <h1>Kashmir Weather Center</h1>

          <p className="weather-subtitle">
            Real-time weather information across Kashmir
          </p>

          <div className="city-selector">

            <label>Select City</label>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {Object.keys(cities).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

          </div>

          {loading && (
            <div className="loading-card">
              Loading weather data...
            </div>
          )}

          {error && (
            <div className="error-card">
              {error}
            </div>
          )}

          {!loading && weather && (
            <>
              <h2 className="city-title">
                {selectedCity}
              </h2>

              <WeatherCard weather={weather} />
            </>
          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Weather;