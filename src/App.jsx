
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import Forecast from "./components/Forecast.jsx";
import "./App.css";
import Footer from "./components/Footer.jsx";

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchCity(city) {
    setLoading(true);
    setError("");

    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=en&format=json`
      );

      if (!geoResponse.ok) {
        throw new Error("Unable to search for the city.");
      }

      const geoData = await geoResponse.json();

      if (!geoData.results?.length) {
        throw new Error("City not found. Please try again.");
      }

      const location = geoData.results[0];

      const params = new URLSearchParams({
        latitude: location.latitude,
        longitude: location.longitude,
        current:
          "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
        daily:
          "weather_code,temperature_2m_max,temperature_2m_min",
        timezone: "auto",
        forecast_days: "6",
      });

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params}`
      );

      if (!response.ok) {
        throw new Error("Unable to load weather.");
      }

      const data = await response.json();

      setWeather({
        city: location.name,
        country: location.country,
        temperature: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m,
        description:
          weatherDescriptions[data.current.weather_code] ||
          "Weather unavailable",
        code: data.current.weather_code,
        time: data.current.time,
      });

      setForecast(
        data.daily.time.slice(1).map((date, index) => ({
          date,
          max: Math.round(
            data.daily.temperature_2m_max[index + 1]
          ),
          min: Math.round(
            data.daily.temperature_2m_min[index + 1]
          ),
          code: data.daily.weather_code[index + 1],
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchCity("Perth");
  }, []);

  return (
    <div className="weather-app">
      <header>
        <div className="logo">🌤️ Res Weather App</div>
      </header>

      <SearchBar onSearch={searchCity} loading={loading} />

      {error && <p className="error">{error}</p>}

      {weather && (
        <>
          <CurrentWeather weather={weather} />
          <Forecast forecast={forecast} />
        </>
      )}

      <Footer />
    </div>
 
  );
}

export default App;
