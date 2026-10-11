
import { getWeatherIcon } from "./ForecastDay";

function CurrentWeather({ weather }) {
  const date = new Date(weather.time);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const formattedTime = weather.time.slice(11, 16);

  return (
    <section className="current-weather">
      <div className="weather-details">
        <h1>{weather.city}</h1>

        <p>
          {formattedDate} {formattedTime},{" "}
          {weather.description.toLowerCase()}
        </p>

        <p>
          Humidity: <strong>{weather.humidity}%</strong>,
          Wind: <strong> {weather.wind} km/h</strong>
        </p>
      </div>

      <div className="temperature">
        <span className="current-icon">
          {getWeatherIcon(weather.code)}
        </span>
        <span className="temperature-number">
          {weather.temperature}
        </span>
        <span className="temperature-unit">°C</span>
      </div>
    </section>
  );
}

export default CurrentWeather;
